import Close from "../UI/Close/Close";
import Input from "../UI/Input/Input";
import classes from "./CompaniesSearch.module.css";
import { useState, useCallback, useRef } from "react";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const CompaniesSearch = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [companies, setCompanies] = useState([]);
  const timeout = useRef(null);

  const inputChangeHandler = useCallback((e) => {
    if (
      e.target.value[e.target.value.length - 1] === " " &&
      inputValue[inputValue.length - 1] === " "
    ) {
      return;
    }

    setInputValue(e.target.value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
      const stringRequest = e.target.value.trim().replace(/ /g, "%20");

      if (stringRequest) {
        try {
          const data = await fetch(
            `https://www.zippia.com/autocomplete/company/?searchString=${stringRequest}`
          );

          const json = await data.json();

          if (Array.isArray(json)) {
            let companiesListSorted = json.sort((a, b) => {
              if (a.companyName > b.companyName) {
                return 1;
              }
              if (a.companyName < b.companyName) {
                return -1;
              }
              return 0;
            });

            setCompanies(companiesListSorted);
          } else {
            setCompanies([]);
          }
        } catch (error) {
          console.log(error);
          setCompanies([]);
        }
      } else {
        setCompanies([]);
      }

      timeout.current = null;
    }, 500);
  });

  return (
    <div className={classes.CompaniesSearch}>
      <div
        className={classes["CompaniesSearch-Blackout"]}
        onClick={props.closeSearchCompanyHandler}
      />
      <div className={classes["CompaniesSearch-Container"]}>
        <Input
          addClasses={[classes["CompaniesSearch-Input"]]}
          mode={2}
          value={inputValue}
          onChange={inputChangeHandler}
          placeholder="company name"
        />
        {companies.length ? (
          <ul className={classes["CompaniesSearch-JobsList"]}>
            {companies.map((company) => {
              return (
                <li
                  className={classes["CompaniesSearch-JobsListItem"]}
                  key={company.companyID}
                  id={company.companyID}
                  onClick={props.jobItemClickHandler}
                >
                  {company.companyName}
                </li>
              );
            })}
          </ul>
        ) : null}
        <Close onClick={props.closeSearchCompanyHandler} />
      </div>
    </div>
  );
};

export default CompaniesSearch;
