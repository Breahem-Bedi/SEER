import React from "react";
import Categories from "./components/Categories";

const Suggestion = () => (
  <>
    <section className="section">
      <div className="container">
        <h2 className="title">New Suggestion</h2>
        <p className="subtitle">Found a research article we should include?</p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <h2 className="subtitle has-text-centered">I am suggesting a...</h2>
        <Categories />
      </div>
    </section>
  </>
);

export default Suggestion;
