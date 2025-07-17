import "./App.css";
import { Theme } from "./components/Theme";
import { ThemeForm } from "./components/ThemeForm";
import { themes } from "./db";
import useLocalStorageState from "use-local-storage-state";

function App() {
  /*
  |----------------------------------------------------------------------------------|
  | Create Form to add Themes (Part 3)",                                             |
  |----------------------------------------------------------------------------------|
  | - create ThemeForm component
  | - implement useState to save current themes
  | - create handleAddTheme to define how theme state will change by adding new theme
  | - define function for form  
  */

  const [defaultThemes, setDefaultThemes] = useLocalStorageState("themes", {
    defaultValue: themes,
  }); //wie kann man den state noch etwas schöner benennen?

  const handleAddTheme = (newTheme) => {
    setDefaultThemes((prev) => [newTheme, ...prev]);
  };

  const handleThemeFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.addTheme.value;
    const roles = ["primary", "secondary", "surface", "surface-on"];

    const colors = [...form.querySelectorAll('input[type="color"]')].map(
      (input, index) => {
        // 1.ist immer element 2.ist immer der index des jeweiligen input elements
        const role = roles[index];
        return {
          role,
          value: input.value,
          // name: `${name}-${role}`,
        };
      }
    );

    // console.log(colors);

    const newTheme = {
      id: crypto.randomUUID(), // zufällig generierte id
      name,
      colors,
    };

    // console.log(newTheme);

    handleAddTheme(newTheme);
    form.reset(); // optional: Formular zurücksetzen
  };

  /*
  |----------------------------------------------------------------------------------|
  | Create Delete Button (Part 4)",                                                  |
  |----------------------------------------------------------------------------------|
  | - create handleDelete Function to define how theme state will change by removing a theme
  | - forward the handler function to the Themes component where its implemented inside delete button 
  */

  const handleDeleteTheme = (id) => {
    const decreasedThemes = defaultThemes.filter((theme) => theme.id !== id); //nur objekte kommen in das neue array deren id nicht identisch sind (mit der gedrückten id)
    setDefaultThemes(decreasedThemes);
  };

  /*
  |----------------------------------------------------------------------------------|
  | Create Edit Button (Part 6)",                                                    |
  |----------------------------------------------------------------------------------|
  | - create handleEditTheme Function to define how theme state will change by adjusting a theme
  | 
  */

  const handleEditTheme = (updatedTheme) => {
    setDefaultThemes((prev) =>
      prev.map((theme) => (theme.id === updatedTheme.id ? updatedTheme : theme))
    );
  };

  return (
    <>
      <header className="header">Theme Creator</header>
      <main>
        <ThemeForm handleThemeFormSubmit={handleThemeFormSubmit} />
        <Theme
          defaultThemes={defaultThemes}
          handleDeleteTheme={handleDeleteTheme}
          handleEditTheme={handleEditTheme}
        />
      </main>
    </>
  );
}

export default App;

// App.jsx nehme ich nur als sammelpunkt für meine komponente und wende hier keine logik an
