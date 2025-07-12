import "./App.css";
import { Theme } from "./components/Theme";
import { ThemeForm } from "./components/ThemeForm";
import { useState } from "react";
import { themes } from "./db";

function App() {
  const [defaultThemes, setDefaultThemes] = useState(themes); //wie kann man den state noch etwas schöner benennen?
  console.log(defaultThemes);

  const handleAddTheme = (event) => {
    event.preventDefault();

    const form = event.target.form;
    const name = form.addTheme.value;
    const roles = ["primary", "secondary", "surface", "surface-on"];

    const colors = [...form.querySelectorAll('input[type="color"]')].map(
      (input, index) => {
        // 1.ist immer element 2.ist immer der index des jeweiligen input elements
        const role = roles[index];
        return {
          role,
          value: input.value,
          name: `${name}-${role}`,
        };
      }
    );

    const newTheme = {
      id: crypto.randomUUID(), // oder Date.now()
      name,
      colors,
    };

    setDefaultThemes((prev) => [newTheme, ...prev]);
    form.reset(); // optional: Formular zurücksetzen
  };

  return (
    <>
      <header className="header">Theme Creator</header>
      <main>
        <ThemeForm handleAddTheme={handleAddTheme} />
        <Theme defaultThemes={defaultThemes} />
      </main>
    </>
  );
}

export default App;

// App.jsx nehme ich nur als sammelpunkt für meine komponente und wende hier keine logik an
