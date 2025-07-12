export function ThemeForm({ handleAddTheme }) {
  return (
    <form>
      <label htmlFor="addTheme">Add a Theme</label>
      <input
        id="addTheme"
        type="text"
        name="addTheme"
        placeholder="Name"
        required
      />
      <article>
        <input type="color" defaultValue="#ffffff" />
        <input type="color" defaultValue="#ffffff" />
        <input type="color" defaultValue="#ffffff" />
        <input type="color" defaultValue="#ffffff" />
      </article>
      <button type="submit" onClick={handleAddTheme}>
        Add Theme
      </button>
    </form>
  );
}
