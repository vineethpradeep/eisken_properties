import { useState } from "react";
import PropTypes from "prop-types";

import "./newPostPage.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

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

  const navigate = useNavigate();

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
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
      navigate("/" + res.data.id);
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
                <input id="address" name="address" type="text" />
              </div>
              <div className="item description">
                <label htmlFor="desc">Description</label>
                <ReactQuill theme="snow" onChange={setValue} value={value} />
              </div>
              <div className="item">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" />
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
                <input id="latitude" name="latitude" type="text" />
              </div>
              <div className="item">
                <label htmlFor="longitude">Longitude</label>
                <input id="longitude" name="longitude" type="text" />
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
                <label htmlFor="bus">bus</label>
                <input min={0} id="bus" name="bus" type="number" />
              </div>
              <div className="item">
                <label htmlFor="train">Train</label>
                <input min={0} id="train" name="train" type="number" />
              </div>
              <button className="sendButton">Add</button>
              {error && <span>error</span>}
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
