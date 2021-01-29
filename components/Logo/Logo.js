import React from "react";
import classes from "./Logo.module.css";
import Image from "next/image";

function Logo(props) {
  const cls = [classes.Logo];

  if (props.addClasses) {
    cls.push(...props.addClasses);
  }

  return (
    <div className={cls.join(" ")}>
      <a
        className={classes["Logo-Container"]}
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        <Image
          className={classes["Logo-Img"]}
          src="/images/logo.png"
          alt="Picture of the author"
          width={167}
          height={43}
        />
      </a>
    </div>
  );
}

export default Logo;
