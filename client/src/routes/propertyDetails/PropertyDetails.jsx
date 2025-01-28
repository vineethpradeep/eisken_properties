import { useLoaderData, useNavigate } from "react-router-dom";
// import { detailPropertyData } from "../../lib/propertiesList";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import DOMPurify from "dompurify";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaTrain,
  FaRulerCombined,
  FaBusAlt,
  FaSchool,
  FaTools,
  FaDog,
  FaDonate,
  FaRegBookmark,
  FaRegCommentDots,
} from "react-icons/fa";
import "./propertyDetails.scss";
import Button from "../../components/button/Button";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function PropertyDetails() {
  const { post } = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(post);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="wrapper-propertyDetails">
      <div className="singlePage">
        <div className="details">
          <div className="slider-wrapper">
            <Slider images={post.images} />
            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{post.title}</h1>
                  <div className="address">
                    <FaMapMarkerAlt />
                    <p>{post.address}</p>
                  </div>
                  <div className="price">$ {post.price}</div>
                </div>
                {/* <div className="user">
                  <img src={userData.img} alt="" />
                  <span>{userData.name}</span>
                </div> */}
              </div>
              <div
                className="bottom"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.postDetail.desc),
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="feature-wrapper">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="feature">
                <FaTools />
                <div className="featureText">
                  <p>Utilities</p>
                  {post.postDetail.utilities === "owner" ? (
                    <span>Owner is responsible</span>
                  ) : (
                    <span>Tenant is responsible</span>
                  )}
                </div>
              </div>
              <div className="feature">
                <FaDog />
                <div className="featureText">
                  <p>Pet Policy</p>
                  {post.postDetail.pet === "allowed" ? (
                    <span>Pets Allowed</span>
                  ) : (
                    <span>Pets not Allowed</span>
                  )}
                </div>
              </div>
              <div className="feature">
                <FaDonate />
                <div className="featureText">
                  <p>Income Policy</p>
                  <span>{post.postDetail.income}</span>
                </div>
              </div>
            </div>
            <p className="title">Sizes</p>
            <div className="sizes">
              <div className="size">
                <FaRulerCombined />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="size">
                <FaBed />
                <span>{post.bedroom} beds</span>
              </div>
              <div className="size">
                <FaBath />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>
            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <FaSchool />
                <div className="featureText">
                  <p>School</p>
                  <span>
                    {post.postDetail.school > 999
                      ? post.postDetail.school / 1000 + "km"
                      : post.postDetail.school + "m"}{" "}
                    away
                  </span>
                </div>
              </div>
              <div className="feature">
                <FaBusAlt />
                <div className="featureText">
                  <p>Bus Stop</p>
                  <span>{post.postDetail.bus}m away</span>
                </div>
              </div>
              <div className="feature">
                <FaTrain />
                <div className="featureText">
                  <p>Railway Station</p>
                  <span>{post.postDetail.train}m away</span>
                </div>
              </div>
            </div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[post]} />
            </div>
            <div className="buttons">
              <Button variant={"primary"}>
                <FaRegCommentDots />
                Send a Message
              </Button>
              <Button variant={"secoundary"} onClick={handleSave}>
                <FaRegBookmark />
                {saved ? "Place Saved" : "Save the Place"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
