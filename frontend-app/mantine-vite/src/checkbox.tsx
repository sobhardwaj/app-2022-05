import { useState } from "react";
import "./checkbox.css";

function Checkbox(prop: any) {
  const boolean = prop.checked;
  const [value, setValue] = useState({});

  return (
    <div className="checkbox">
      <label className="container">
        <input checked={prop.checked} type="checkbox" />
        <div className="checkmark"></div>
      </label>
    </div>
  );
}

export default Checkbox;
