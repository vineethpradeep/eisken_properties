import React from "react";
import OurProcess from "../ourProcess/OurProcess";
import processOne from "../../images/process-img-1.png";
import processTwo from "../../images/process-img-2.png";
import processThree from "../../images/process-img-3.png";
import ProcessDivider from "../ProcessDivider";

import "./howItWorks.scss";

const steps = [
  {
    id: 1,
    images: processOne,
    title: "Choose a Category",
    description:
      "Explore our wide range of property categories to find the one that suits your needs best—residential, commercial, or rental",
  },
  {
    id: 2,
    images: processTwo,
    title: "Reach Us",
    description:
      "Get in touch with our expert agents through a call, email, or visit. We're here to assist you every step of the way",
  },
  {
    id: 3,
    images: processThree,
    title: "Take the Keys",
    description:
      "Seal the deal and collect your keys! Your dream property is now ready to welcome you home",
  },
];

const HowItWorks = () => {
  return (
    <div className="our-process-container">
      <div className="our-process-header">
        <h1>How It Works</h1>
        <p className="caption">
          Our process is simple and straight forward. We&apos;re here to guide
          you every step of the way
        </p>
      </div>
      <div className="processHolder">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <OurProcess
              id={step.id}
              img={step.images}
              title={step.title}
              description={step.description}
            />
            {index < steps.length - 1 && <ProcessDivider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default HowItWorks;
