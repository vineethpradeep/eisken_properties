import Jumbotron from "../jumbotron/Jumbotron";
import SearchBar from "../searchBar/SearchBar";
import "./homeTourVideo.scss";

const HomeTourVideo = () => {
  return (
    <div className="videoTourContainer">
      <div className="videoTour">
        <video autoPlay muted loop>
          <source src="coverr-tour.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="highLight">
          <div className="bg">
            <div className="highLight-content">
              <h1>Find Your Perfect Property</h1>
              <div className="text-line">
                <span>Your search in one place</span>
              </div>
            </div>
            <SearchBar />
          </div>
        </div>
        <Jumbotron />
      </div>
    </div>
  );
};

export default HomeTourVideo;
