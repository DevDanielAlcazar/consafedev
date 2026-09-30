# Cleanup diferido por política del entorno

Durante RC1 el entorno automatizado bloqueó la eliminación de algunos archivos
individuales con `blocked by policy`.

Esto NO debe volver a bloquear el release si se cumplen estas condiciones:

- los media antiguos no aparecen en HTML/JS/CSS generado;
- no son solicitados durante el recorrido normal;
- los nuevos media RC1 son los únicos referenciados por el Hero;
- `app/actions/schedule.ts` queda neutralizado y ya no contiene ni invoca el
  webhook histórico.

Archivos antiguos que permanecen en `public/media/`:

- `consafedev-operation-resolve-v2.mp4`
- `consafedev-operation-resolve.mp4`
- `consafedev-operation-fragmented.jpg`
- `consafedev-operation-fragmented-v2.jpg`

Los medios antiguos pueden eliminarse en un commit de housekeeping cuando el
entorno permita borrado. No deben volver a ser referenciados.
