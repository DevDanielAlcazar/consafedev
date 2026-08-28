#!/usr/bin/env bash

set -Eeuo pipefail

# ============================================================
# ConSafeDev - Deployment Script
# ============================================================

APP_DIR="/opt/consafedev/app"
BACKUP_ROOT="/opt/consafedev/backups"

LOCAL_URL="http://127.0.0.1:3002"
PUBLIC_URL="https://consafedev.qzz.io"

PROMOTION_STARTED=0
PREVIOUS_NEXT=""
BUILD_DIR=""

rollback() {
    rc=$?

    echo
    echo "================================================"
    echo "ERROR DURANTE DEPLOY"
    echo "================================================"
    echo "Código de salida: $rc"

    if [ "$PROMOTION_STARTED" -eq 1 ] \
        && [ -n "$PREVIOUS_NEXT" ] \
        && [ -d "$PREVIOUS_NEXT" ]; then

        echo
        echo "Ejecutando rollback automático..."

        sudo systemctl stop consafedev.service || true

        if [ -d "$APP_DIR/.next" ]; then
            rm -rf "$APP_DIR/.next.failed"
            mv "$APP_DIR/.next" "$APP_DIR/.next.failed"
        fi

        mv "$PREVIOUS_NEXT" "$APP_DIR/.next"

        cd "$APP_DIR"

        git reset --hard "$OLD_COMMIT"

        sudo systemctl start consafedev.service || true

        sleep 2

        echo
        echo "Estado después del rollback:"

        sudo systemctl status \
            consafedev.service \
            --no-pager \
            -l \
            | head -18 || true

        curl \
            --silent \
            --show-error \
            --output /dev/null \
            --write-out 'Local rollback HTTP %{http_code}\n' \
            "$LOCAL_URL/" || true
    fi

    if [ -n "${BUILD_DIR:-}" ] && [ -d "$BUILD_DIR" ]; then
        git -C "$APP_DIR" worktree remove \
            --force \
            "$BUILD_DIR" \
            2>/dev/null || true

        rm -rf "$BUILD_DIR" 2>/dev/null || true
    fi

    git -C "$APP_DIR" worktree prune 2>/dev/null || true

    echo
    echo "Deploy abortado."
    exit "$rc"
}

trap rollback ERR


# ============================================================
# 1. PRE-CHECK
# ============================================================

cd "$APP_DIR"

echo
echo "================================================"
echo "1. PRE-CHECK"
echo "================================================"

git fetch origin

OLD_COMMIT="$(git rev-parse HEAD)"
OLD_SHORT="$(git rev-parse --short HEAD)"

NEW_COMMIT="$(git rev-parse origin/main)"
NEW_SHORT="$(git rev-parse --short origin/main)"

echo "Producción : $OLD_SHORT"
echo "GitHub     : $NEW_SHORT"

if [ -n "$(git status --porcelain)" ]; then
    echo
    echo "ERROR: Existen cambios locales en producción:"
    git status --short
    exit 1
fi

if [ "$OLD_COMMIT" = "$NEW_COMMIT" ]; then
    echo
    echo "No hay cambios nuevos que desplegar."
    exit 0
fi


# ============================================================
# 2. BUILD TEMPORAL
# ============================================================

echo
echo "================================================"
echo "2. BUILD TEMPORAL"
echo "================================================"

BUILD_DIR="/tmp/consafedev-build-$NEW_SHORT"

rm -rf "$BUILD_DIR"

git worktree prune

git worktree add \
    --detach \
    "$BUILD_DIR" \
    "$NEW_COMMIT"

cd "$BUILD_DIR"

npm ci
npm run build


# ============================================================
# 3. PREPARAR NEXT.JS STANDALONE
# ============================================================

echo
echo "================================================"
echo "3. PREPARAR STANDALONE"
echo "================================================"

mkdir -p .next/standalone/.next

rm -rf .next/standalone/.next/static

cp -a \
    .next/static \
    .next/standalone/.next/static

if [ -d public ]; then
    rm -rf .next/standalone/public

    cp -a \
        public \
        .next/standalone/public
fi

test -f .next/standalone/server.js
test -d .next/standalone/.next/static

echo "OK - Build preparado correctamente."


# ============================================================
# 4. BACKUP
# ============================================================

echo
echo "================================================"
echo "4. BACKUP"
echo "================================================"

BACKUP_DIR="$BACKUP_ROOT/$(date +%Y%m%d_%H%M%S)-$OLD_SHORT"

sudo mkdir -p "$BACKUP_DIR"
sudo chown daniel:daniel "$BACKUP_DIR"

echo "$OLD_COMMIT" > "$BACKUP_DIR/git-commit.txt"

cp -a \
    "$APP_DIR/.next" \
    "$BACKUP_DIR/.next"

echo "Backup creado:"
echo "$BACKUP_DIR"


# ============================================================
# 5. ACTUALIZAR CHECKOUT
# ============================================================

echo
echo "================================================"
echo "5. ACTUALIZAR CÓDIGO"
echo "================================================"

cd "$APP_DIR"

git merge --ff-only origin/main

echo
echo "Código actualizado:"
git log -1 --oneline


# ============================================================
# 6. PROMOVER BUILD
# ============================================================

echo
echo "================================================"
echo "6. PROMOVER BUILD"
echo "================================================"

PREVIOUS_NEXT="$APP_DIR/.next.previous"

rm -rf "$PREVIOUS_NEXT"

sudo systemctl stop consafedev.service

mv \
    "$APP_DIR/.next" \
    "$PREVIOUS_NEXT"

PROMOTION_STARTED=1

mv \
    "$BUILD_DIR/.next" \
    "$APP_DIR/.next"

sudo systemctl start consafedev.service


# ============================================================
# 7. HEALTH CHECK LOCAL
# ============================================================

echo
echo "================================================"
echo "7. HEALTH CHECK LOCAL"
echo "================================================"

READY=0

for i in {1..10}; do

    if curl \
        --fail \
        --silent \
        --output /tmp/consafedev-local.html \
        "$LOCAL_URL/"; then

        READY=1
        break
    fi

    sleep 1
done

if [ "$READY" -ne 1 ]; then
    echo "ERROR: La aplicación no respondió en localhost."
    false
fi

echo "Local HTTP 200"


# ============================================================
# 8. VALIDAR ASSETS
# ============================================================

echo
echo "================================================"
echo "8. VALIDAR ASSETS"
echo "================================================"

ASSET="$(
    grep -oE '/_next/static/[^"]+\.(js|css)' \
        /tmp/consafedev-local.html \
        | head -1
)"

if [ -z "$ASSET" ]; then
    echo "ERROR: No se encontró un asset Next.js."
    false
fi

echo "Asset:"
echo "$ASSET"

curl \
    --fail \
    --silent \
    --show-error \
    --output /dev/null \
    --write-out 'Asset HTTP %{http_code}\n' \
    "$LOCAL_URL$ASSET"


# ============================================================
# 9. HEALTH CHECK PÚBLICO
# ============================================================

echo
echo "================================================"
echo "9. HEALTH CHECK PÚBLICO"
echo "================================================"

PUBLIC_READY=0

for i in {1..10}; do

    if curl \
        --fail \
        --silent \
        --output /tmp/consafedev-public.html \
        "$PUBLIC_URL/"; then

        PUBLIC_READY=1
        break
    fi

    sleep 1
done

if [ "$PUBLIC_READY" -ne 1 ]; then
    echo "ERROR: La URL pública no respondió correctamente."
    false
fi

echo "Cloudflare HTTP 200"


# ============================================================
# 10. LIMPIEZA
# ============================================================

echo
echo "================================================"
echo "10. LIMPIEZA"
echo "================================================"

PROMOTION_STARTED=0

rm -rf "$PREVIOUS_NEXT"
rm -rf "$APP_DIR/.next.failed"

git worktree remove \
    --force \
    "$BUILD_DIR" \
    2>/dev/null || true

git worktree prune

rm -f /tmp/consafedev-local.html
rm -f /tmp/consafedev-public.html

BUILD_DIR=""

echo
echo "================================================"
echo "DEPLOY EXITOSO"
echo "================================================"

git log -1 --oneline

echo

sudo systemctl status \
    consafedev.service \
    --no-pager \
    -l \
    | head -18
