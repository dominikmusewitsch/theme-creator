import ColorCard from "./ColorCard";
import { ColorPreview } from "./ColorPreview";
import { useState } from "react";
import { EditForm } from "./EditForm";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import "./Theme.css";

export function Theme({ defaultThemes, handleDeleteTheme, handleEditTheme }) {
  const [view, setView] = useState({});

  /*
  |----------------------------------------------------------------------------------|
  | Create Preview Toggle (Part 2)",                                                 |
  |----------------------------------------------------------------------------------|
  | - create ColorPreview.jsx
  | - implement useState to save view of ColorCard or ColorPreview
  | - handleClickView to switch states 
  | - define view states in return 
  */

  const getViewState = (id) => view[id] ?? "preview"; // beudeutung: gib view[id] zurück, aber wenn es null oder undefined ist, dann "preview" = IST AUCH DER AUSGANGSPUNKT

  const handleClickView = (id) => {
    setView((prev) => ({
      //mit dieser Schreibweise baue ich auf dem aktuellen zustand auf und ersetze nicht alles
      ...prev,
      [id]: prev[id] === "details" ? "preview" : "details",
    }));
  };

  /*
  |----------------------------------------------------------------------------------|
  | Create Edit Button (Part 6)",                                                    |
  |----------------------------------------------------------------------------------|
  | - create handleClickEdit function to define how view state will change by choosing "edit"
  | - define function for submit form 
  | - define "edit" view state in return 
  */

  const handleClickEdit = (id) => {
    setView((prev) => ({
      ...prev,
      [id]: "edit",
    }));
  };

  const onSubmitEditTheme = (event, id) => {
    event.preventDefault();

    const form = event.target;
    const newName = form.editTheme.value;

    const newColors = Array.from(
      // Array.from wandelt NodeList in einen Array um, damit ich es anschließend mappen kann
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
      [id]: "details",
    }));
  };

  return (
    <div>
      {defaultThemes.map((theme) => (
        <div className="theme" key={theme.id}>
          <div className="theme__header">
            <h2 className="theme__header-name">{theme.name}</h2>
            <button
              className="theme__header-button"
              onClick={() => handleClickView(theme.id)}
            >
              {getViewState(theme.id) === "edit" ? ( //das hier ist eine Erweiterte Bedingung, damit ich auch ein Edit Abbrechen Button darstellen kann
                "❌"
              ) : getViewState(theme.id) === "details" ? (
                <IconArrowUp />
              ) : (
                <IconArrowDown />
              )}
            </button>
          </div>

          {getViewState(theme.id) === "details" && (
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
          )}

          {getViewState(theme.id) === "edit" && (
            <EditForm
              onSubmitEditTheme={(event) => onSubmitEditTheme(event, theme.id)}
              name={theme.name}
              colors={theme.colors}
            />
          )}

          {getViewState(theme.id) === "preview" && ( // zeigt die colorpreview, wenn keine ansicht für dieses theme gesetzt ist
            <article className="colorpreview">
              {theme.colors.map((color) => (
                <ColorPreview
                  key={color.name || color.role} // "color.role" -> um fehlermeldung zu beheben in der konsole: wegen benötigten key attributes
                  value={color.value}
                />
              ))}
            </article>
          )}
        </div>
      ))}
    </div>
  );
}
