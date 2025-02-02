import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// import { useSession } from "next-auth/react";
// import { FaPaperPlane } from "react-icons/fa";
import Button from "../button/Button";
import "./contactForm.scss";

const ContactForm = ({
  property,
  heading,
  description = false,
  generalQuery = false,
}) => {
  //   const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  //   const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (generalQuery) {
      toast.success(
        "Thank you for your message! We will get in touch with you on the next working day."
      );
    }
    const data = {
      name,
      email,
      phone,
      message,
      receiver: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        toast.success("Message sent successfully");
        // setIsSubmitted(true);
      } else {
        const dataObj = await res.json();
        toast.error(dataObj.message);
      }
    } catch (err) {
      toast.error(` ${err} Error while submitting the form`);
    } finally {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className={"contactFormContainer"}>
      <h4 className={"heading"}>{heading}</h4>
      {description && (
        <p className={"description"}>
          Complete this form and we will get back to you in 24 hours.
        </p>
      )}

      {
        <form onSubmit={handleSubmit} className={"form"}>
          <div className={"formGroup"}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={"formGroup"}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={"formGroup"}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={"formGroup"}>
            <label htmlFor="message">Message</label>
            <textarea
              rows="4"
              id="message"
              placeholder="Type a message..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className={"buttonContainer"}>
            <Button variant="primary">Send Message</Button>
          </div>
        </form>
      }
    </div>
  );
};

ContactForm.propTypes = {
  property: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.bool,
  generalQuery: PropTypes.bool,
};

export default ContactForm;
