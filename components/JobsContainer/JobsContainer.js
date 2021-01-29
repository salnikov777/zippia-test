import classes from "./JobsContainer.module.css";
import JobsItem from "./__JobsItem/JobsItem";

function JobsContainer(props) {
  const cls = [classes.JobsContainer];

  if (props.addClasses) {
    cls.push(...props.addClasses);
  }
  let jobsList = null;

  if (props.jobs.length) {
    jobsList = props.jobs.map((job) => {
      return (
        <JobsItem
          key={job.jobId}
          id={job.jobId}
          title={job.jobTitle}
          company={job.companyName}
          shortDesc={job.shortDesc || job.OBJindustry}
        />
      );
    });
  }

  return jobsList ? (
    <div className={cls.join(" ")}>{jobsList}</div>
  ) : (
    <h2 className={classes["JobsContainer-NoJob"]}>
      There is no job for your request
    </h2>
  );
}

export default JobsContainer;
