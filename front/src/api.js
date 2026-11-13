const BASE = import.meta.env.VITE_API_URL;

async function pedir(ruta, opciones) {
  const respuesta = await fetch(`${BASE}${ruta}`, opciones);
  const datos = await respuesta.json();
  if (!respuesta.ok) throw new Error(datos.error || 'Error en la peticion');
  return datos;
}

export const obtenerProductos = () => pedir('/productos');
export const obtenerResumen = () => pedir('/productos/resumen');
export const crearProducto = (producto) =>
  pedir('/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });