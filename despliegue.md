# Despliegue de ConSafeDev

Este documento describe la arquitectura y el procedimiento real de despliegue de ConSafeDev en producción.

---

## 1. Arquitectura

ConSafeDev se ejecuta en un servidor Debian utilizando Next.js Standalone y systemd.

El tráfico público se expone mediante Cloudflare Tunnel.

```text
GitHub
DevDanielAlcazar/consafedev
        │
        │ branch: main
        ▼
/opt/consafedev/app
        │
        │ deploy.sh
        ▼
Next.js Standalone
.next/standalone/server.js
        │
        ▼
consafedev.service
        │
        │ 127.0.0.1:3002
        ▼
cloudflared-consafedev.service
        │
        ▼
Cloudflare Tunnel
        │
        ▼
https://consafedev.qzz.io
```

---

## 2. Componentes

### Repositorio

Repositorio GitHub:

```text
https://github.com/DevDanielAlcazar/consafedev
```

Ruta en producción:

```text
/opt/consafedev/app
```

Branch productiva:

```text
main
```

---

## 3. Aplicación Next.js

La aplicación utiliza:

```text
Next.js 15
output: standalone
```

El servidor productivo generado por Next.js es:

```text
/opt/consafedev/app/.next/standalone/server.js
```

La aplicación escucha únicamente en:

```text
127.0.0.1:3002
```

El puerto no está expuesto directamente a Internet.

---

## 4. Servicio systemd

ConSafeDev NO utiliza PM2.

El proceso productivo es administrado mediante:

```text
consafedev.service
```

Archivo:

```text
/etc/systemd/system/consafedev.service
```

Configuración actual:

```ini
[Unit]
Description=ConSafeDev Next.js App
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=daniel
Group=daniel
WorkingDirectory=/opt/consafedev/app

Environment=NODE_ENV=production
Environment=PORT=3002
Environment=HOSTNAME=127.0.0.1

EnvironmentFile=-/etc/consafedev.env

ExecStart=/usr/bin/node /opt/consafedev/app/.next/standalone/server.js

Restart=always
RestartSec=5

TimeoutStopSec=30
KillSignal=SIGINT

NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

Comandos de administración:

```bash
sudo systemctl status consafedev.service
sudo systemctl restart consafedev.service
sudo systemctl stop consafedev.service
sudo systemctl start consafedev.service
```

Logs:

```bash
sudo journalctl -u consafedev.service -n 100 --no-pager
```

Logs en tiempo real:

```bash
sudo journalctl -u consafedev.service -f
```

---

## 5. Cloudflare Tunnel

La aplicación se publica mediante un túnel Cloudflare administrado localmente desde Debian.

Servicio:

```text
cloudflared-consafedev.service
```

Configuración:

```text
/etc/cloudflared/config-consafedev.yml
```

Ingress:

```yaml
ingress:
  - hostname: consafedev.qzz.io
    service: http://127.0.0.1:3002

  - service: http_status:404
```

El flujo es:

```text
consafedev.qzz.io
        ↓
Cloudflare
        ↓
cloudflared-consafedev.service
        ↓
127.0.0.1:3002
        ↓
Next.js
```

Durante un despliegue normal de la aplicación NO es necesario reiniciar cloudflared.

Validar configuración:

```bash
sudo cloudflared \
  --config /etc/cloudflared/config-consafedev.yml \
  tunnel ingress validate
```

Validar regla:

```bash
sudo cloudflared \
  --config /etc/cloudflared/config-consafedev.yml \
  tunnel ingress rule https://consafedev.qzz.io
```

Estado:

```bash
sudo systemctl status cloudflared-consafedev.service
```

---

## 6. Procedimiento normal de despliegue

Los cambios deben estar previamente enviados a:

```text
origin/main
```

En el servidor:

```bash
cd /opt/consafedev/app
```

Verificar que no existan cambios locales:

```bash
git status
```

Después ejecutar:

```bash
bash deploy.sh
```

No es necesario ejecutar manualmente:

```text
npm install
npm run build
pm2 restart
systemctl restart
cloudflared
```

El script realiza automáticamente todo el procedimiento.

---

## 7. Qué hace deploy.sh

El proceso realiza:

```text
git fetch
        ↓
verificar working tree
        ↓
identificar origin/main
        ↓
crear build temporal
        ↓
npm ci
        ↓
npm run build
        ↓
preparar Next.js Standalone
        ↓
crear backup de producción
        ↓
actualizar checkout local
        ↓
detener consafedev.service
        ↓
promover nuevo .next
        ↓
arrancar consafedev.service
        ↓
health check localhost
        ↓
validar asset Next.js
        ↓
health check Cloudflare
        ↓
limpieza
```

El build se realiza fuera del `.next` productivo para evitar modificar los archivos que está utilizando la aplicación mientras continúa atendiendo tráfico.

---

## 8. Next.js Standalone

`next build` genera:

```text
.next/standalone
```

Sin embargo, los archivos:

```text
.next/static
```

deben estar disponibles dentro de:

```text
.next/standalone/.next/static
```

Por este motivo `deploy.sh` realiza:

```bash
mkdir -p .next/standalone/.next

rm -rf .next/standalone/.next/static

cp -a \
  .next/static \
  .next/standalone/.next/static
```

Si en el futuro el proyecto utiliza:

```text
public/
```

el script también lo copia a:

```text
.next/standalone/public
```

---

## 9. Backups

Antes de promover un nuevo build se genera un respaldo en:

```text
/opt/consafedev/backups/
```

Formato aproximado:

```text
YYYYMMDD_HHMMSS-COMMIT
```

Ejemplo:

```text
/opt/consafedev/backups/20260828_125711-81fc7a4
```

El backup contiene:

```text
git-commit.txt
.next/
```

Estos directorios NO son aplicaciones activas ni instancias adicionales.

Solo son respaldos para recuperación.

---

## 10. Rollback automático

Durante la promoción se conserva temporalmente:

```text
.next.previous
```

Si el nuevo build no inicia o falla una validación después de la promoción, `deploy.sh` intenta automáticamente:

```text
detener consafedev.service
        ↓
retirar build fallido
        ↓
restaurar .next.previous
        ↓
regresar Git al commit anterior
        ↓
arrancar consafedev.service
        ↓
validar localhost
```

Cuando el deploy termina correctamente:

```text
.next.previous
```

es eliminado.

---

## 11. Health checks

### Aplicación local

```bash
curl -I http://127.0.0.1:3002/
```

Debe responder:

```text
HTTP 200
```

### Aplicación pública

```bash
curl -I https://consafedev.qzz.io/
```

Debe responder:

```text
HTTP 200
```

### Servicio

```bash
systemctl is-active consafedev.service
```

Debe responder:

```text
active
```

---

## 12. Diagnóstico

### La página pública no responde

Primero revisar la aplicación:

```bash
curl -I http://127.0.0.1:3002/
```

Si no responde:

```bash
sudo systemctl status consafedev.service
```

Después revisar logs:

```bash
sudo journalctl \
  -u consafedev.service \
  -n 100 \
  --no-pager
```

---

### Local funciona pero la URL pública no

Si:

```bash
curl -I http://127.0.0.1:3002/
```

funciona pero:

```bash
curl -I https://consafedev.qzz.io/
```

no funciona, revisar:

```bash
sudo systemctl status cloudflared-consafedev.service
```

Logs:

```bash
sudo journalctl \
  -u cloudflared-consafedev.service \
  -n 100 \
  --no-pager
```

Validar ingress:

```bash
sudo cloudflared \
  --config /etc/cloudflared/config-consafedev.yml \
  tunnel ingress validate
```

---

## 13. PM2

PM2 NO administra ConSafeDev.

Actualmente PM2 puede administrar otras aplicaciones del servidor, pero no debe utilizarse para iniciar, detener o actualizar ConSafeDev.

Por tanto, NO utilizar:

```bash
pm2 restart consafedev
```

ni:

```bash
pm2 restart consafedev-web
```

Para ConSafeDev siempre utilizar:

```bash
sudo systemctl restart consafedev.service
```

o, para despliegues:

```bash
./deploy.sh
```

---

## 14. Nginx

Aunque Nginx existe en el servidor, actualmente no participa en la publicación de ConSafeDev.

El tráfico fluye directamente:

```text
Cloudflare Tunnel
        ↓
127.0.0.1:3002
        ↓
Next.js
```

No es necesario modificar Nginx para desplegar cambios de ConSafeDev.

---

## 15. Variables de entorno

El servicio puede cargar variables desde:

```text
/etc/consafedev.env
```

mediante:

```ini
EnvironmentFile=-/etc/consafedev.env
```

Actualmente no se utilizan variables `NEXT_PUBLIC_*`.

IMPORTANTE:

Las variables `NEXT_PUBLIC_*` son incorporadas por Next.js durante el build.

Si en el futuro se agregan variables de este tipo, deberán estar disponibles también durante:

```bash
npm run build
```

y deberá revisarse `deploy.sh`.

---

## 16. Seguridad y mantenimiento

No ejecutar automáticamente durante un deploy:

```bash
npm audit fix
```

ni actualizaciones mayores de dependencias.

Las actualizaciones de dependencias deben probarse y desplegarse como cambios independientes.

Tampoco mezclar un despliegue normal de la web con:

```text
actualización de cloudflared
actualización de Node.js
actualización de npm
cambios systemd
cambios de túnel
```

Cada modificación de infraestructura debe validarse por separado.

---

## 17. Resumen operativo

Para un despliegue normal:

```bash
cd /opt/consafedev/app

git status

bash deploy.sh
```

Después verificar:

```bash
curl -I http://127.0.0.1:3002/

curl -I https://consafedev.qzz.io/

sudo systemctl status consafedev.service
```

Esta es la única vía oficial de despliegue de ConSafeDev.
