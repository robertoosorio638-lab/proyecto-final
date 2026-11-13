import { useState } from 'react';

export default function FormularioProducto({ onCrear }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  async function enviar(evento) {
    evento.preventDefault();
    try {
      await onCrear({ nombre, precio: Number(precio), stock: Number(stock) });
      setNombre('');
      setPrecio('');
      setStock('');
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <form onSubmit={enviar}>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
      <input placeholder="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} />
      <button type="submit">Agregar producto</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}