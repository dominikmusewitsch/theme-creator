import "./ColorPreview.css";

export function ColorPreview({ value }) {
  return (
    <div
      className="colorcard__preview"
      style={{ backgroundColor: value }}
    ></div>
  );
}
