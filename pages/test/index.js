import MainLayout from "../../components/MainLayout/MainLayout";
import classes from "../../components/MainLayout/MainLayout.module.css";
import Breadcrumbs from "../../components/UI/Breadcrumps/Breadcrumbs";

import { useCallback, useEffect, useRef, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import JobsContainer from "../../components/JobsContainer/JobsContainer";
import Loader from "./../../components/UI/Loader/Loader.js";
import CompaniesSearch from "./../../components/CompaniesSearch/CompaniesSearch";

function Index({ jobs: serverJobs }) {
  const [jobs, setJobs] = useState(serverJobs);
  const [loading, setLoading] = useState(false);
  const [isSeacrhCompanyOpen, setIsSeacrhCompanyOpen] = useState(false);

  const initialReqData = useRef({
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  });

  const [currentRequestData, setCurrentRequestData] = useState({
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  });

  const [currentRequest, setCurrentRequest] = useState(
    "https://www.zippia.com/api/jobs/"
  );

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch("https://www.zippia.com/api/jobs/", {
        method: "POST",
        body: JSON.stringify(initialReqData.current),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      setJobs(json.jobs);
      setLoading(false);
    }
    if (!serverJobs) {
      load();
    }
  }, []);

  const navLinks = useRef([
    { to: "/", label: "jobs" },
    { to: "/", label: "research" },
  ]);

  const breadcrumbs = useRef([
    { to: "/", label: "Zippia Careers" },
    { to: "/", label: "Computer and Mathematical Industry" },
    { to: "/", label: "Developer" },
  ]);

  const lastSevenDayClickHandler = useCallback(async () => {
    setLoading(true);

    try {
      const data = { ...currentRequestData, postingDateRange: "7d" };
      const res = await fetch(currentRequest, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setJobs(json.jobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const developButtonHandler = useCallback(() => {
    setIsSeacrhCompanyOpen(true);
  });

  const closeSearchCompanyHandler = useCallback(() => {
    setIsSeacrhCompanyOpen(false);
  });

  const jobItemClickHandler = useCallback(async (e) => {
    setLoading(true);
    setIsSeacrhCompanyOpen(false);

    const data = { ...initialReqData.current, companyId: +e.target.id };

    setCurrentRequestData(data);
    setCurrentRequest("https://www.zippia.com/api/getCompanyJobs/");

    try {
      const res = await fetch("https://www.zippia.com/api/getCompanyJobs/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();
      setJobs(json.jobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <MainLayout title="test" navLinks={navLinks.current}>
      <div className={classes["MainLayout-Wrapper"]}>
        <Breadcrumbs breadcrumbs={breadcrumbs.current} />
        <Input placeholder="Place for a job title" type="text" mode={1} />
      </div>
      <h1 className={classes["MainLayout-Header"]}>
        Business Analyst{" "}
        <span className={classes["MainLayout-HeaderSpan"]}>Jobs</span>
      </h1>
      <div className={classes["MainLayout-SearchButtonWrapper"]}>
        <Button
          addClasses={[classes["MainLayout-SearchButton"]]}
          mode={3}
          onClick={developButtonHandler}
        >
          Search by company
        </Button>
        <Button
          onClick={lastSevenDayClickHandler}
          addClasses={[classes["MainLayout-SearchButton"]]}
          mode={3}
        >
          Last 7 days
        </Button>
      </div>
      {!jobs || loading ? (
        <Loader />
      ) : (
        <JobsContainer
          addClasses={[classes["MainLayout-JobsContainer"]]}
          jobs={jobs.slice(0, 10)}
        />
      )}
      {isSeacrhCompanyOpen ? (
        <CompaniesSearch
          jobItemClickHandler={jobItemClickHandler}
          closeSearchCompanyHandler={closeSearchCompanyHandler}
        />
      ) : null}
    </MainLayout>
  );
}

Index.getInitialProps = async (ctx) => {
  if (!ctx.req) {
    return { jobs: null };
  }

  const data = {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  };
  const res = await fetch("https://www.zippia.com/api/jobs/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return { jobs: json.jobs };
};

export default Index;
