import { useState } from "react";
import "./testimonials.scss";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Rebecca Watson",
    company: "R. W. Construction Inc.",
    image: "https://i.pravatar.cc/150?img=32",
    text: "StructrePress company has performed in a consistent, demanding and professional manner. They have got my project on time with the competition with a highly skilled, well-organized and experienced team of professional construction managers. Our company is looking forward to hire them again.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-header">
        <h1 className="testimonial-title">Testimonials</h1>
        <p className="caption">Hear from Our Happy Customers</p>
      </div>
      <div className="testimonial">
        <div className="testimonial-card">
          <div className="testimonial-left">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="testimonial-image"
            />
            <div className="testimonial-info">
              <strong>{testimonials[currentIndex].name}</strong>
              <p>{testimonials[currentIndex].company}</p>
            </div>
          </div>
          <div className="testimonial-right">
            <p>{testimonials[currentIndex].text}</p>
          </div>
        </div>
        <div className="testimonial-nav">
          <button onClick={prevTestimonial}>
            <FaCaretLeft />
          </button>
          <button onClick={nextTestimonial}>
            <FaCaretRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
