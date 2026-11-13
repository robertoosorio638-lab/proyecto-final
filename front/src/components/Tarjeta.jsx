export default function Tarjeta({ titulo, valor, alerta = false }) {
  return (
    <div className={alerta ? 'tarjeta alerta' : 'tarjeta'}>
      <h3>{titulo}</h3>
      <p>{valor}</p>
    </div>
  );
}