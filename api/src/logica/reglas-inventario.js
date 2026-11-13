// Un producto con 5 unidades o menos se considera en stock bajo.
// Si cambia el criterio, se cambia aquí y en ninguna otra parte.
export const STOCK_MINIMO = 5;

export function estaBajoStock(stock) {
  return stock <= STOCK_MINIMO;
}

export function calcularValorInventario(productos) {
  return productos.reduce((suma, p) => suma + p.precio * p.stock, 0);
}

// Devuelve un mensaje de error, o null si el producto es válido
export function validarProducto({ nombre, precio, stock }) {
  if (typeof nombre !== 'string' || nombre.trim() === '') {
    return 'El nombre es obligatorio';
  }
  if (typeof precio !== 'number' || Number.isNaN(precio) || precio <= 0) {
    return 'El precio debe ser un número mayor que 0';
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return 'El stock debe ser un entero de 0 o más';
  }
  return null;
}