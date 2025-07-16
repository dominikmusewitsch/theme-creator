import "./EditForm.css";

export function EditForm({ onSubmitEditTheme, colors, name }) {
  return (
    <form className="submitform-edit" onSubmit={onSubmitEditTheme}>
      <label className="submitform-edit__label" htmlFor="editTheme">
        Edit Theme
      </label>
      <input
        className="submitform-edit__input"
        id="editTheme"
        type="text"
        name="editTheme"
        placeholder="Name"
        required
        defaultValue={name}
      />
      <article className="submitform-edit__article">
        {colors.map((color, index) => (
          <input
            className="submitform-edit__article-input"
            key={index}
            type="color"
            defaultValue={color.value}
            name={color.role}
          />
        ))}
      </article>
      <button className="submitform-edit__button" type="submit">
        Save Theme
      </button>
    </form>
  );
}
