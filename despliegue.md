# Guía de Despliegue: ConSafeDev en Servidor Debian con Cloudflared

Esta guía detalla cómo desplegar y actualizar tu aplicación Next.js en tu servidor Debian usando Git, PM2 (para mantener la app viva y aislada) y Cloudflared (para exponerla de forma segura).

## 1. Requisitos Previos en el Servidor Debian

Asegúrate de tener instalados los siguientes componentes:

```bash
# Actualizar repositorios
sudo apt update && sudo apt upgrade -y

# Instalar Git, Curl y Build-Essential
sudo apt install git curl build-essential -y

# Instalar Node.js (Recomendado v20 LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 globalmente (Gestor de procesos para Node.js)
sudo npm install -g pm2
```

## 2. Clonar el Repositorio

Clona tu repositorio de GitHub en el directorio donde alojarás la aplicación (por ejemplo, `/var/www/` o en tu directorio de usuario `~/`):

```bash
# Navegar al directorio deseado
cd ~

# Clonar el repositorio (reemplaza con tu URL de GitHub)
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git consafedev-web

# Entrar al directorio del proyecto
cd consafedev-web
```

## 3. Configuración Inicial y Primer Despliegue

Instala las dependencias y compila la aplicación para producción:

```bash
# Instalar dependencias
npm install

# Compilar la aplicación Next.js
npm run build
```

Una vez compilada, inicia la aplicación usando PM2. Esto asegura que la aplicación se ejecute en segundo plano, se reinicie si falla y no interfiera con otros servicios.

```bash
# Iniciar la aplicación en el puerto 3000 (puedes cambiarlo si el 3000 está ocupado)
pm2 start npm --name "consafedev-web" -- start --port 3000

# Guardar la lista de procesos de PM2 para que arranquen al reiniciar el servidor
pm2 save
pm2 startup
```
*(Sigue las instrucciones que te dé el comando `pm2 startup` para configurar el inicio automático).*

## 4. Exponer mediante Cloudflared (Túnel)

Ya que usas Cloudflare Tunnels, no necesitas abrir puertos en tu firewall ni configurar Nginx/Apache.

1. Ve a tu panel de **Cloudflare Zero Trust** > **Networks** > **Tunnels**.
2. Crea un nuevo túnel o edita uno existente.
3. En la pestaña **Public Hostname**, añade una nueva ruta:
   - **Public Hostname**: `tudominio.com` (o el subdominio que desees).
   - **Service Type**: `HTTP`
   - **URL**: `localhost:3000` (o el puerto que hayas configurado en PM2).
4. Guarda los cambios. Cloudflare enrutará el tráfico de forma segura directamente a tu app Next.js.

---

## 5. Cómo Actualizar la Aplicación (Sin Downtime Significativo)

Cuando hagas cambios en tu código y los subas a GitHub, sigue estos pasos en tu servidor Debian para actualizar la aplicación sin interferir con otros servicios:

```bash
# 1. Entrar al directorio del proyecto
cd ~/consafedev-web

# 2. Obtener los últimos cambios de GitHub
git pull origin main

# 3. Instalar nuevas dependencias (si las hay)
npm install

# 4. Recompilar la aplicación
npm run build

# 5. Reiniciar el proceso en PM2 para aplicar los cambios
pm2 restart consafedev-web
```

### Script de Actualización Rápida (Opcional)
Para facilitar las actualizaciones, puedes crear un script `deploy.sh` en la raíz de tu proyecto:

```bash
#!/bin/bash
echo "Descargando actualizaciones..."
git pull origin main

echo "Instalando dependencias..."
npm install

echo "Compilando aplicación..."
npm run build

echo "Reiniciando servicio..."
pm2 restart consafedev-web

echo "¡Actualización completada exitosamente!"
```
Dale permisos de ejecución (`chmod +x deploy.sh`) y simplemente ejecuta `./deploy.sh` cada vez que quieras actualizar.

## Resumen de Aislamiento
- **PM2** mantiene el proceso de Node.js aislado en su propio puerto local (ej. 3000).
- **Cloudflared** se conecta directamente a ese puerto local.
- Esto garantiza que tus otros servicios (bases de datos, otros servidores web, etc.) no se vean afectados por los despliegues o reinicios de esta aplicación.
