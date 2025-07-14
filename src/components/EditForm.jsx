export function EditForm({ handleEditTheme, colors, name }) {
  return (
    <form onSubmit={handleEditTheme}>
      <label htmlFor="editTheme">Edit Theme</label>
      <input
        id="editTheme"
        type="text"
        name="editTheme"
        placeholder="Name"
        required
        defaultValue={name}
      />
      <article>
        {colors.map((color, index) => (
          <input
            key={index}
            type="color"
            defaultValue={color.value}
            name={color.role}
          />
        ))}
      </article>
      <button type="submit">Save Theme</button>
    </form>
  );
}
