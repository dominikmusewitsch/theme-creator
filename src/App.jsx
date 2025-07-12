import "./App.css";
import ColorCard from "./ColorCard";
import { themes } from "./db.js";

function App() {
  const theme = themes[0];
  return (
    <>
      <header className="header">Theme Creator</header>
      <main>
        <h2 className="name">{theme.name}</h2>
        <ul className="colorcard__list">
          <li key={theme.id}>
            {theme.colors.map((color, index) => (
              <ColorCard key={index} value={color.value} role={color.role} />
            ))}
          </li>
        </ul>
      </main>
    </>
  );
}

export default App;
