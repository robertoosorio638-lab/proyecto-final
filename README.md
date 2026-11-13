# Inventario de productos

Aplicación web para consultar y registrar productos de una tienda, con alerta de stock bajo y valor total del inventario.

## Integrantes

- Roberto Osorio: repositorio, back-end en Node/Express, front en React, pruebas, documentación y despliegue (trabajo individual autorizado por el docente).

## Tecnologias

React (Vite), Node.js, Express, Vitest, AWS S3 y EC2.

## Como levantarlo en local

```bash
git clone https://github.com/robertoosorio638-lab/proyecto-final.git
cd proyecto-final/api && npm install && npm run dev
cd proyecto-final/front && npm install && npm run dev
```

Variables de entorno (copiar los `.env.example`):

- `api/.env`: `PORT` (puerto de la API) y `FRONT_URL` (origen permitido por CORS).
- `front/.env.development`: `VITE_API_URL` (direccion de la API).

## Endpoints de la API

| Metodo | Ruta | Que hace | Respuesta |
|---|---|---|---|
| GET | /productos | Lista los productos con el campo stockBajo | 200 · arreglo |
| GET | /productos/resumen | Valor del inventario y cuantos tienen stock bajo | 200 · objeto |
| POST | /productos | Agrega un producto. Requiere nombre, precio y stock | 201 · el creado / 400 · datos invalidos |

## Como correr las pruebas

```bash
cd api
npm test
```

## Despliegue

Front compilado (`npm run build`) en un bucket de S3 y API en una instancia EC2.
URL del front: [pegar al desplegar].
Para redesplegar: poner la IP de la API en `front/.env.production`, correr `npm run build`, subir el contenido de `dist/` al bucket y arrancar la API en EC2 con `FRONT_URL` igual a la URL del bucket.

## Seguridad

- Validacion en el servidor en la ruta POST.
- `.env` fuera de Git y `.env.example` en el repositorio.
- CORS restringido a la URL del front (variable `FRONT_URL`).
- Security Group con una sola regla de entrada (puerto de la API) y SSH cerrado.
- `npm audit`: api reporto 0 vulnerabilidades. El front reporto 4 moderadas, todas de `minimatch` dentro de ESLint (herramienta de desarrollo, no se incluye en el build de produccion). No se aplico `npm audit fix --force` porque instalaria una version mayor de ESLint con cambios que rompen compatibilidad.