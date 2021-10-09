import React, { Fragment } from "react";
import Page from "../components/page";
import Hero from "../components/hero/hero";
import About from "../components/about/about";
import Header from "../components/header/header";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Page>
        <About />
      </Page>
    </Fragment>
  );
}
