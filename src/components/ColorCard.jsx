import { useEffect } from "react";
import "./ColorCard.css";
import useLocalStorageState from "use-local-storage-state";

/*
  |----------------------------------------------------------------------------------|
  | Create Delete Button (Part 5)",                                                  |
  |----------------------------------------------------------------------------------|
  */

export default function ColorCard({ role, value }) {
  const [colorName, setColorName] = useLocalStorageState(`colorName-${value}`, {
    defaultValue: "",
  }); // jeder key brauch einen individuellen namen, ansonsten sind haben alle colorcards den selben namen

  useEffect(() => {
    async function getColorName() {
      const hex = value.replace("#", ""); // macht "#" weg
      const url = `https://www.thecolorapi.com/id?hex=${hex}`;

      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      // console.log(data.name.value);
      setColorName(data.name.value);
    }
    getColorName();
  }, [value]); // sorgt dafür dass es nur bei neuen Farbwerten ausgeführt wird

  /*
  |----------------------------------------------------------------------------------|
  | Create Color card Component (Part 1)",                                           |
  |----------------------------------------------------------------------------------|
  | display:
  | - hex values & roles
  | - style color card to represent hex value
  | - render color cards for each theme (via mapping in Theme Component)
  */

  return (
    <article className="colorcard">
      <div className="colorcard__info">
        <h3 className="colorcard__info-role">{role}</h3>
        <p className="colorcard__info-name">{colorName}</p>
        <p className="colorcard__info-value">{value}</p>
      </div>
      <div
        className="colorcard__swatch"
        style={{ backgroundColor: value }}
      ></div>
    </article>
  );
}
