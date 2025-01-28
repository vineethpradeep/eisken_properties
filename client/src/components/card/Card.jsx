import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRegBookmark,
  FaRegCommentDots,
} from "react-icons/fa";

import "./card.scss";

function Card({ item }) {
  console.log(item);
  return (
    <div className="card">
      <Link to={`/properties/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/properties/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <FaMapMarkerAlt />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <FaBed />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <FaBath />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <FaRegBookmark />
            </div>
            <div className="icon">
              <FaRegCommentDots />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedroom: PropTypes.number.isRequired,
    bathroom: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
