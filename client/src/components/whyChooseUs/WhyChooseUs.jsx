import ReviewCount from "../reviewCount/ReviewCount";
import "./whyChooseUs.scss";

const reviews = [
  {
    reviewCount: 2100,
    reviewer: "Real estate users already have used our Eisken properties",
  },
  {
    reviewCount: 580,
    reviewer: "Clients supports and their satisfactions",
  },
  {
    reviewCount: 801,
    reviewer: "Owned properties transactions",
  },
  {
    reviewCount: 15,
    reviewer: "Monthly campaign with orders",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="whyUs-container">
      <div className="whyChooseUs">
        <p className="caption">Why choose Eisken properties </p>
        <h1>Trusted real estate company by the happy users</h1>
        <p>
          Online property marketplace to buy, sell, and rent residential and
          commercial properties. Used by millions of renters to find property.
          Browse millions of properties in your city save your.
        </p>
      </div>
      <div className="review-container">
        {reviews.map((review, index) => (
          <div className="counterPart" key={index}>
            <ReviewCount
              key={index}
              reviewCount={review.reviewCount}
              reviewer={review.reviewer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhyChooseUs;
