import { FaPhoneAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import "./Jumbotron.scss";

const Jumbotron = () => {
  return (
    <div className="jumbotron-infobar">
      <div className="widget">
        <div className="info-box">
          <div className="icon">
            <FaPhoneAlt />
          </div>
          <div className="info">
            <h4>Phone number:</h4>
            <span>+01792-644023</span>
          </div>
        </div>
        <div className="info-box">
          <div className="icon">
            <FaRegClock />
          </div>
          <div className="info">
            <h4>Opening times:</h4>
            <span>Mon - Thu: 9:00 AM to 5:00 PM, Fri - until 2:00 PM</span>
          </div>
        </div>
        <div className="info-box">
          <div className="icon">
            <FaRegEnvelope />
          </div>
          <div className="info">
            <h4>Email address:</h4>
            <span>enquiries@eiskenp.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
