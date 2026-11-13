import { useEffect, useState } from 'react';
import { obtenerProductos, obtenerResumen, crearProducto } from './api';
import Tarjeta from './components/Tarjeta';
import FormularioProducto from './components/FormularioProducto';
import './App.css';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState('');

  async function cargar() {
    try {
      setProductos(await obtenerProductos());
      setResumen(await obtenerResumen());
      setError('');
    } catch {
      setError('No se pudo conectar con la API');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function agregar(producto) {
    await crearProducto(producto);
    await cargar();
  }

  return (
    <main>
      <h1>Inventario de productos</h1>
      {error && <p className="error">{error}</p>}

      {resumen && (
        <section className="resumen">
          <Tarjeta titulo="Valor del inventario" valor={`$${resumen.valorInventario}`} />
          <Tarjeta titulo="Total de productos" valor={resumen.totalProductos} />
          <Tarjeta
            titulo="Con stock bajo"
            valor={resumen.productosStockBajo}
            alerta={resumen.productosStockBajo > 0}
          />
        </section>
      )}

      <FormularioProducto onCrear={agregar} />

      <section className="lista">
        {productos.map(p => (
          <Tarjeta
            key={p.id}
            titulo={p.nombre}
            valor={`$${p.precio} · stock ${p.stock}${p.stockBajo ? ' · STOCK BAJO' : ''}`}
            alerta={p.stockBajo}
          />
        ))}
      </section>
    </main>
  );
}