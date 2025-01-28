import MyList from "../../components/myList/MyList";
import Chat from "../../components/chat/Chat";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { AuthContext } from "../../context/AuthContext";
import { Suspense, useContext } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

function ProfilePage() {
  const data = useLoaderData();
  console.log(data);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const navigate = useNavigate();

  const toggleModal = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      // console.log(res.data);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    const { username, email, password } = formObject;

    let avatarUrl = null;
    const avatarFile = formData.get("avatar");
    if (avatarFile) {
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", avatarFile); // Attach the file
      cloudinaryData.append("upload_preset", "realEstate"); // Your unsigned upload preset
      cloudinaryData.append("folder", "avatar"); // Folder in Cloudinary

      try {
        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/eiskenproperties/image/upload", // Cloudinary URL
          cloudinaryData
        );
        avatarUrl = cloudinaryRes.data.secure_url; // Get the URL of the uploaded image
        console.log("Uploaded Avatar URL:", avatarUrl);
        setAvatar(avatarUrl);
      } catch (err) {
        console.error("Error uploading to Cloudinary:", err);
        setError("Failed to upload avatar. Please try again.");
        return;
      }
    }
    try {
      const res = await apiRequest.put(`users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatarUrl,
      });
      // console.log(res.data);
      updateUser(res.data);
      toggleModal();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred.");
    }
    // console.log("Form Data:", formData);
  };

  return (
    <>
      <div className="wrapper-profile">
        <div className="profilePage">
          <div className="details">
            <div className="wrapper-details">
              <div className="title">
                <h1>User Information</h1>
                <Button variant={"primary"} onClick={toggleModal}>
                  Update Profile
                </Button>
              </div>
              <div className="info">
                <span>
                  Avatar:
                  <img
                    src={avatar || "images/blankProfile.png"}
                    alt="Avatar Image"
                  />
                </span>
                <span>
                  Username: <b>{currentUser.username}</b>
                </span>
                <span>
                  E-mail: <b>{currentUser.email}</b>
                </span>
                <Button variant={"secoundary"} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className="title">
                <h1>My List</h1>
                <Link to="/add">
                  <button>Create New Post</button>
                </Link>
              </div>
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => (
                    <MyList posts={postResponse.data.userPosts} />
                  )}
                </Await>
              </Suspense>
              <div className="title">
                <h1>Saved List</h1>
              </div>
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => (
                    <MyList posts={postResponse.data.savedPosts} />
                  )}
                </Await>
              </Suspense>
            </div>
          </div>
          <div className="chatContainer">
            <div className="wrapper-chat">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.chatResponse}
                  errorElement={<p>Error loading chats!</p>}
                >
                  {(chatResponse) => <Chat chats={chatResponse.data} />}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      {isOpen &&
        createPortal(
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Update Your Details</h2>
              {error && <span>{error}</span>}
              <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                  Name:
                  <input
                    type="text"
                    name="username"
                    defaultValue={currentUser.username}
                    placeholder={currentUser.username}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Email:
                  <input
                    type="email"
                    name="email"
                    defaultValue={currentUser.email}
                    placeholder={currentUser.email}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Password:
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Avatar:
                  <input
                    type="file"
                    name="avatar"
                    className="form-input"
                    accept="image/*"
                  />
                </label>
                <div className="form-actions">
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                  <Button variant="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default ProfilePage;
