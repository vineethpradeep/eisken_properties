import { useState } from "react";
import PropTypes from "prop-types";
import "./newPostPage.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";

function ImagePlaceholder({ image, onRemove }) {
  return (
    <div className="image-placeholder">
      {image ? (
        <img src={image} alt="Uploaded preview" className="image-preview" />
      ) : (
        <div className="placeholder">No Image</div>
      )}
      {onRemove && (
        <button className="remove-btn" onClick={onRemove}>
          <FaTimesCircle />
        </button>
      )}
    </div>
  );
}

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to show during geocode request

  const navigate = useNavigate();

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Geocode postal code to get latitude and longitude
  const geocodePostalCode = async (postalCode) => {
    if (!postalCode) return;

    setLoading(true);

    try {
      // UK-specific geocoding API
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postalCode}`
      );
      if (response.data.status === 200) {
        const { latitude, longitude } = response.data.result;
        setLat(latitude); // Set latitude
        setLng(longitude); // Set longitude

        // Reverse geocode to get city and address based on lat and lng
        reverseGeocode(latitude, longitude);
      } else {
        setError("No location found for this postal code.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setError("Failed to fetch location.");
    } finally {
      setLoading(false);
    }
  };

  // Reverse geocode latitude and longitude to get address and city
  const reverseGeocode = async (lat, lng) => {
    try {
      // Reverse geocoding API request to get address based on latitude and longitude
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: `${lat},${lng}`,
            key: "eb409dd0578e46ba9d0b9c5e866efd67", // Replace with your OpenCage API key
          },
        }
      );

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        setAddress(result.components.suburb); // Set full address
        const city =
          result.components.city ||
          result.components.town ||
          result.components.village;
        setCity(city || ""); // Set city (if available)
      } else {
        setError("No address found for these coordinates.");
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setError("Failed to fetch address.");
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPostalCode(value); // Update postal code state
    geocodePostalCode(value); // Call geocode function
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: address,
          city: city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: String(lat),
          longitude: String(lng),
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          train: parseInt(inputs.train),
        },
      });
      navigate("/properties/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="wrapper-add-post">
      <div className="newPostPage">
        <div className="formContainer">
          <h1>Add New Post</h1>
          <div className="post-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="item">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" />
              </div>
              <div className="item">
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" />
              </div>
              <div className="item">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address || ""}
                />
              </div>
              <div className="item">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
              </div>
              <div className="item description">
                <label htmlFor="desc">Description</label>
                <ReactQuill theme="snow" onChange={setValue} value={value} />
              </div>
              <div className="item">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" value={city || ""} />
              </div>
              <div className="item">
                <label htmlFor="bedroom">Bedroom Number</label>
                <input min={1} id="bedroom" name="bedroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="bathroom">Bathroom Number</label>
                <input min={1} id="bathroom" name="bathroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="latitude">Latitude</label>
                <input
                  id="latitude"
                  name="latitude"
                  type="text"
                  value={lat || ""}
                />
              </div>
              <div className="item">
                <label htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  name="longitude"
                  type="text"
                  value={lng || ""}
                />
              </div>
              <div className="item">
                <label htmlFor="type">Type</label>
                <select name="type">
                  <option value="rent" defaultChecked>
                    Rent
                  </option>
                  <option value="buy">Buy</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="type">Property</label>
                <select name="property">
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div className="item">
                <label htmlFor="utilities">Utilities Policy</label>
                <select name="utilities">
                  <option value="owner">Owner is responsible</option>
                  <option value="tenant">Tenant is responsible</option>
                  <option value="shared">Shared</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="pet">Pet Policy</label>
                <select name="pet">
                  <option value="allowed">Allowed</option>
                  <option value="not-allowed">Not Allowed</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="income">Income Policy</label>
                <input
                  id="income"
                  name="income"
                  type="text"
                  placeholder="Income Policy"
                />
              </div>
              <div className="item">
                <label htmlFor="size">Total Size (sqft)</label>
                <input min={0} id="size" name="size" type="number" />
              </div>
              <div className="item">
                <label htmlFor="school">School</label>
                <input min={0} id="school" name="school" type="number" />
              </div>
              <div className="item">
                <label htmlFor="bus">Bus Station</label>
                <input min={0} id="bus" name="bus" type="number" />
              </div>
              <div className="item">
                <label htmlFor="train">Train Station</label>
                <input min={0} id="train" name="train" type="number" />
              </div>
              <button className="sendButton" disabled={loading}>
                Add
              </button>
              {error && <span>{error.message}</span>}
            </form>
          </div>
        </div>
        <div className="imageContainer">
          <div className="image-wrapper">
            <div className="image-grid">
              {images.map((image, index) => (
                <ImagePlaceholder
                  key={index}
                  image={image}
                  onRemove={() => handleRemoveImage(index)}
                />
              ))}
              {images.length === 0 && (
                <div className="no-images">No images uploaded</div>
              )}
            </div>
            {/* {images.map((image, index) => (
              <img src={image} key={index} alt="" />
            ))} */}
            <UploadWidget
              uwConfig={{
                multiple: true,
                cloudName: "eiskenproperties",
                uploadPreset: "realEstate",
                folder: "posts",
              }}
              setState={setImages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ImagePlaceholder.propTypes = {
  image: PropTypes.string,
  onRemove: PropTypes.func,
};

export default NewPostPage;
