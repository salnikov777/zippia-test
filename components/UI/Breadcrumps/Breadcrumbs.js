import classes from "./Breadcrumbs.module.css";

function Breadcrumbs({ breadcrumbs }) {
  return (
    <div className={classes.Breadcrumbs}>
      {breadcrumbs.map((breadcrumb, idx) => {
        return (
          <a
            // className={classes[type] ? classes[type] : classes.standard}
            onClick={(e) => e.preventDefault()}
            href={breadcrumb.to}
            key={idx}
            className={classes["Breadcrumbs-Link"]}
          >
            &nbsp;{breadcrumb.label}&nbsp;
            {breadcrumbs.length - 1 !== idx ? "/" : null}
          </a>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
