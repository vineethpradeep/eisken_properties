import { Link } from "react-router-dom";
import { FaMapMarker, FaBriefcase } from "react-icons/fa";
import OurTeams from "../../components/ourTeams/OurTeams";
import "./aboutUs.scss";
import ReviewCount from "../../components/reviewCount/ReviewCount";
import Button from "../../components/button/Button";

const reviews = [
  {
    reviewCount: 2100,
    reviewer: "Properties",
  },
  {
    reviewCount: 580,
    reviewer: "Clients",
  },
];

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us__svg-container">
        <svg
          className="about-us__svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className={"about-us__wavePolygon"}
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="container">
        <div className="about-us__card">
          <div className="about-us__content">
            <div className="about-us__moreInfo">
              <div className="about-us__cta">
                <Link to="/contact">
                  <Button variant={"primary"}>Contact Us</Button>
                </Link>
              </div>

              <div className="about-us__stats">
                {reviews.map((review, index) => (
                  <div className="about-us__stat" key={index}>
                    <ReviewCount
                      key={index}
                      reviewCount={review.reviewCount}
                      reviewer={review.reviewer}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="about-us__info">
              <h3 className="about-us__title">Eisken Properties LTD</h3>
              <div className="about-us__location">
                <FaMapMarker className="about-us__icon" />
                76 Mansel Street Swansea SA1 5TW
              </div>
              <div className="about-us__business">
                <FaBriefcase className="about-us__icon" />
                Accredited Letting Agent & Property Sales
              </div>
            </div>

            <OurTeams />

            <div className="about-us__description">
              <p>
                Eisken Properties was established in 2022 by Kimberley Richards,
                along with our helpful team we deliver a customer-focused,
                innovative approach to property letting and sales. We recognize
                that letting a property can be a challenging experience for both
                landlords and contract holders. However, both can enjoy the
                benefits of an unrivaled customer service with our ‘Can Do’
                approach.
              </p>
              <a href="#pablo" className="about-us__policy-link">
                View Our Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
