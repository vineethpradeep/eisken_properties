import PropTypes from "prop-types";
import "./ourProcess.scss";

const OurProcess = ({ id, img, title, description }) => {
  return (
    <div className="processFlow">
      <div className="processFlow-img">
        <img width="250" height="177" src={img} alt="step1" />
      </div>
      <p className="processFlow-count">{id}</p>
      <h5 className="processFlow-title">{title}</h5>
      <p className="processFlow-description">{description}</p>
    </div>
  );
};
OurProcess.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default OurProcess;
