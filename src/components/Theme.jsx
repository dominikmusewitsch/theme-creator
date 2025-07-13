import ColorCard from "./ColorCard";
import { ColorPreview } from "./ColorPreview";
import { useState } from "react";

export function Theme({ defaultThemes, handleDeleteTheme }) {
  const [view, setView] = useState(false);

  const handleClickView = (id) => {
    setView((prev) => ({
      ...prev, // MORGEN NOCHMAL DURCHGEHEN
      [id]: !prev[id], // toggelt den aktuellen Status: [colortheme-id]: !view
    }));
  };

  return (
    <div>
      {defaultThemes.map((theme, index) => (
        <div key={index}>
          <h2 className="name">{theme.name}</h2>
          <button onClick={() => handleClickView(theme.id)}>
            {view[theme.id] ? "⬆️" : "⬇️"}
          </button>
          {view[theme.id] ? (
            <>
              <button onClick={() => handleDeleteTheme(theme.id)}>
                Delete
              </button>
              <ul className="colorcard__list">
                <li key={theme.id}>
                  {theme.colors.map((color) => (
                    <ColorCard
                      key={color.name}
                      value={color.value}
                      role={color.role}
                    />
                  ))}
                </li>
              </ul>
            </>
          ) : (
            <article className="preview">
              {theme.colors.map((color) => (
                <ColorPreview
                  key={color.name}
                  value={color.value}
                  role={color.role}
                />
              ))}
            </article>
          )}
        </div>
      ))}
    </div>
  );
}
