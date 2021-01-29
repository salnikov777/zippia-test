import Head from "next/head";
import Navigation from "../Navigation/Navigation";
import classes from "./MainLayout.module.css";
import { useState } from "react";
import Footer from "../Footer/Footer";

function MainLayout({ children, title = "zippia.com", navLinks = [] }) {
  return (
    <div className={classes.MainLayout}>
      <Head>
        <title>zippia.com | {title}</title>
        <meta name={"keyword"} content="zippia.com, search work" />
        <meta
          name={"description"}
          content="It is the best company in the world!"
        />
      </Head>
      <Navigation links={navLinks} />
      <main className={classes["MainLayout-Main"]}>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
