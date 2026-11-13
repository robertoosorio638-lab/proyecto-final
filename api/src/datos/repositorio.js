const productos = [
  { id: 1, nombre: 'Cuaderno', precio: 4500, stock: 20 },
  { id: 2, nombre: 'Lapicero', precio: 1200, stock: 3 },
  { id: 3, nombre: 'Borrador', precio: 800, stock: 5 }
];

export const listar = () => productos;

export function agregar(producto) {
  productos.push(producto);
  return producto;
}