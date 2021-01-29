import classes from "./Loader.module.css";

function Loader(props) {
  return (
    <div className={classes.Loader}>
      <div className={classes["lds-heart"]}>
        <div />
      </div>
    </div>
  );
}

export default Loader;
