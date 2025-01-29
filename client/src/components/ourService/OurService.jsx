import Button from "../button/Button";
import HighLightCheck from "../highlightCheck/HighlightCheck";
import QuietStreetImage from "../../images/svg/housing_search.svg";
import "./ourService.scss";

const OurService = () => {
  return (
    <div className="service-container">
      <div className="service-wrapper">
        <div className="image-section">
          <div className="card-section">
            {/* <img
            className="card-image"
            src="/images/properties/interior_11.jpg"
            alt="Home Tour"
            width="300"
            height="100"
          /> */}
            <img src={QuietStreetImage} alt="Quiet Street" />
            <blockquote>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 583 95"
              className="svg-shape"
            >
              <polygon points="-30,95 583,95 583,65"></polygon>
            </svg> */}
              <h4>Looking to Buy a new property or Sell an existing one?</h4>
              <p>
                Eisken Properties provides an effortless way to achieve your
                dreams. We are dedicated to turning your vision into reality
                with ease and professionalism.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="content-section">
          <span className="caption">IT’S TIME TO KNOW ABOUT US </span>
          <h3>We help you find your new places.</h3>
          <p>
            Online property marketplace to buy, sell, and rent residential and
            commercial properties. Used by millions of renters to find property.
            Browse millions of properties in your city save your.
          </p>
          <div className="highlightBox">
            <HighLightCheck />
            <p> More than 20 years of experience</p>
          </div>
          <div className="highlightBox">
            <HighLightCheck />
            <p> 1000+ Clients trusting our agency</p>
          </div>
          <div className="btnSection">
            <Button variant={"primary"}>About Company</Button>
            <Button variant={"secoundary"}>Find Property</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurService;
