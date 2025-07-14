import ColorCard from "./ColorCard";
import { ColorPreview } from "./ColorPreview";
import { useState } from "react";
import { EditForm } from "./EditForm";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import "./Theme.css";

export function Theme({ defaultThemes, handleDeleteTheme, handleEditTheme }) {
  const [view, setView] = useState({});

  const handleClickView = (id) => {
    setView((prev) => {
      const isCurrentlyExpanded = prev[id]?.expanded || false;

      return {
        ...prev, // MORGEN NOCHMAL DURCHGEHEN
        [id]: {
          ...prev[id],
          expanded: !isCurrentlyExpanded,
          edit: false,
        },
      };
    });
  };

  const handleClickEdit = (id) => {
    setView((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        edit: !prev[id]?.edit,
      },
    }));
  };

  const onSubmitEditTheme = (event, id) => {
    event.preventDefault();

    const form = event.target;
    const newName = form.editTheme.value;

    const newColors = Array.from(
      form.querySelectorAll("input[type='color']")
    ).map((input) => ({
      role: input.name,
      value: input.value,
    }));

    const updatedTheme = {
      id,
      name: newName,
      colors: newColors,
    };

    handleEditTheme(updatedTheme);

    setView((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        edit: false,
      },
    }));
  };

  return (
    <div>
      {defaultThemes.map((theme, index) => (
        <div className="theme" key={index}>
          <div className="theme__header">
            <h2 className="theme__header-name">{theme.name}</h2>
            <button
              className="theme__header-button"
              onClick={() => handleClickView(theme.id)}
            >
              {view[theme.id]?.expanded ? <IconArrowUp /> : <IconArrowDown />}
            </button>
          </div>
          {view[theme.id]?.expanded ? (
            <>
              <div className="theme__body">
                <button
                  className="theme__body-edit"
                  onClick={() => handleClickEdit(theme.id)}
                >
                  Edit
                </button>
                <button
                  className="theme__body-delete"
                  onClick={() => handleDeleteTheme(theme.id)}
                >
                  Delete
                </button>
              </div>

              {view[theme.id]?.edit && (
                <EditForm
                  handleEditTheme={(event) =>
                    onSubmitEditTheme(event, theme.id)
                  }
                  name={theme.name}
                  colors={theme.colors}
                />
              )}

              <ul className="colorcard__list">
                <li key={theme.id}>
                  {theme.colors.map((color) => (
                    <ColorCard
                      key={color.name || color.role}
                      value={color.value}
                      role={color.role}
                    />
                  ))}
                </li>
              </ul>
            </>
          ) : (
            <article className="colorpreview">
              {theme.colors.map((color) => (
                <ColorPreview
                  key={color.name || color.role} // "color.role" -> um fehlermeldung zu beheben in der konsole: wegen benötigten key attributes
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
