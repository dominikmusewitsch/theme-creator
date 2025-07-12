import "./ColorPreview.css";

export function ColorPreview({ value }) {
  return (
    <div className="color-preview" style={{ backgroundColor: value }}></div>
  );
}
