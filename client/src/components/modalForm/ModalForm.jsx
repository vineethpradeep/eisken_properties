import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import "./ModalForm.scss";

const ModalForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    toggleModal();
  };

  return (
    <div className="modal-form">
      <Button onClick={toggleModal}>Open Form</Button>
      {isOpen &&
        createPortal(
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Fill Your Details</h2>
              <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Avatar:
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    className="form-input"
                  />
                </label>
                <div className="form-actions">
                  <Button type="submit">Submit</Button>
                  <Button variant="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ModalForm;
