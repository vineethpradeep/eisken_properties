import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
// import ScrollTrigger from "react-scroll-trigger";
import PropTypes from "prop-types";
import "./reviewCount.scss";

const ReviewCount = ({ reviewCount, reviewer }) => {
  const [counter, setCounter] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounter(true);
        } else {
          setCounter(false);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="couter-wrapper" ref={counterRef}>
      <h4>
        {counter && (
          <CountUp
            end={reviewCount}
            duration={5}
            formattingFn={(value) => value.toString()}
          />
        )}
        {reviewCount > 1000 ? "K" : "+"}
      </h4>
      <p>{reviewer}</p>
    </div>
  );
};

ReviewCount.propTypes = {
  reviewCount: PropTypes.number,
  reviewer: PropTypes.string,
};

export default ReviewCount;
