import "./ThemeForm.css";

export function ThemeForm({ handleThemeFormSubmit }) {
  return (
    <form className="submitform" onSubmit={handleThemeFormSubmit}>
      <label className="submitform__label" htmlFor="addTheme">
        Add a Theme
      </label>
      <input
        className="submitform__input"
        id="addTheme"
        type="text"
        name="addTheme"
        placeholder="Name"
        required
      />
      <article className="submitform__article">
        <input
          className="submitform__article-input"
          type="color"
          defaultValue="#ffffff"
        />
        <input
          className="submitform__article-input"
          type="color"
          defaultValue="#ffffff"
        />
        <input
          className="submitform__article-input"
          type="color"
          defaultValue="#ffffff"
        />
        <input
          className="submitform__article-input"
          type="color"
          defaultValue="#ffffff"
        />
      </article>
      <button className="submitform__button" type="submit">
        Add Theme
      </button>
    </form>
  );
}
