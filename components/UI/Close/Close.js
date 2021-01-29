import classes from "./Close.module.css";

const Close = (props) => {
  return <div onClick={props.onClick} className={classes.Close} />;
};

export default Close;
