import classes from "./JobsItem.module.css";

function JobsItem({ id, title, company, shortDesc }) {
  return (
    <div className={classes["JobsContainer-JobItem"]} id={id}>
      <h1 className={classes["JobsContainer-JobItemHeader"]}>{title}</h1>
      <p className={classes["JobsContainer-JobItemCompanyName"]}>{company}</p>
      <p className={classes["JobsContainer-JobItemDesc"]}>
        {shortDesc.length < 150 ? shortDesc : shortDesc.slice(0, 150) + "..."}
      </p>
    </div>
  );
}

export default JobsItem;
