import express from 'express';
import cors from 'cors';
import rutasProductos from './rutas/productos.js';

const app = express();

// CORS restringido a un solo origen (en producción: la URL del bucket de S3)
const ORIGEN_FRONT = process.env.FRONT_URL || 'http://localhost:5173';
app.use(cors({ origin: ORIGEN_FRONT }));
app.use(express.json());

// Middleware: se escribe una vez y registra todas las peticiones
app.use((req, res, siguiente) => {
  console.log(`${req.method} ${req.url}`);
  siguiente();
});

app.use('/productos', rutasProductos);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => console.log('API escuchando en el puerto ' + PUERTO));