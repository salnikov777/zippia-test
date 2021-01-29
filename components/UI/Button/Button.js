import classes from "./Button.module.css";
import mode1 from "./_mode/Button_mode_1.module.css";
import mode2 from "./_mode/Button_mode_2.module.css";
import mode3 from "./_mode/Button_mode_3.module.css";

function Button(props) {
  const mode = {
    1: mode1["Button_mode_1"],
    2: mode2["Button_mode_2"],
    3: mode3["Button_mode_3"],
  };

  const cls = [classes.Button];

  if (props.addClasses) {
    cls.push(...props.addClasses);
  }

  if (props.mode) {
    cls.push(mode[props.mode]);
  }

  return (
    <button onClick={props.onClick} className={cls.join(" ")}>
      {props.children}
    </button>
  );
}

export default Button;
