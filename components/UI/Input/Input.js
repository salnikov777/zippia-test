import { useCallback } from "react";
import classes from "./Input.module.css";
import mode1 from "./_mode/Input_mode_1.module.css";
import mode2 from "./_mode/Input_mode_2.module.css";

function Input(props) {
  const mode = {
    1: mode1["Input_mode_1"],
    2: mode2["Input_mode_2"],
  };

  const cls = [classes.Input];

  if (props.addClasses) {
    cls.push(...props.addClasses);
  }

  if (props.mode) {
    cls.push(mode[props.mode]);
  }

  return (
    <input
      onChange={props.onChange}
      value={props.value}
      type={props.type}
      className={cls.join(" ")}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
