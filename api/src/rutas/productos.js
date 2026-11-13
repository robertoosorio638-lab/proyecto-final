import { Router } from 'express';
import { estaBajoStock, calcularValorInventario, validarProducto } from '../logica/reglas-inventario.js';
import * as repo from '../datos/repositorio.js';

const router = Router();

// DRY: un solo lugar para el formato de respuesta
const responder = (res, codigo, datos) => res.status(codigo).json(datos);

router.get('/', (req, res) => {
  // El back manda el estado ya calculado: el front no repite la regla
  const lista = repo.listar().map(p => ({ ...p, stockBajo: estaBajoStock(p.stock) }));
  responder(res, 200, lista);
});

router.get('/resumen', (req, res) => {
  const lista = repo.listar();
  responder(res, 200, {
    valorInventario: calcularValorInventario(lista),
    productosStockBajo: lista.filter(p => estaBajoStock(p.stock)).length,
    totalProductos: lista.length
  });
});

router.post('/', (req, res) => {
  const { nombre, precio, stock } = req.body;
  const error = validarProducto({ nombre, precio, stock });
  if (error) {
    return responder(res, 400, { error });
  }
  const nuevo = repo.agregar({ id: Date.now(), nombre: nombre.trim(), precio, stock });
  responder(res, 201, nuevo);
});

export default router;