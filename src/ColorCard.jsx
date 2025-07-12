import "./ColorCard.css";

export default function ColorCard({ role, value }) {
  console.log(role, value);
  return (
    <article className="color__card">
      <div className="color__info">
        <h3 className="role">{role}</h3>
        <p className="value">{value}</p>
      </div>
      <div className="color__swatch" style={{ backgroundColor: value }}></div>
    </article>
  );
}
