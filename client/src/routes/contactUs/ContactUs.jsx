import { FaPhoneAlt, FaEnvelope, FaLocationArrow } from "react-icons/fa";
import ContactForm from "../../components/contactForm/ContactForm";
import "./contactUs.scss";

const ContactUs = () => {
  return (
    <>
      <section className={"contactSection"}>
        <div className={"waveSvgContainer"}>
          <svg
            className={"waveSvg"}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
          >
            <polygon
              className={"wavePolygon"}
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className={"container"}>
          <div className={"textCenter"}>
            <h2 className={"heading"}>
              &quot;Unlock Your Dream Home Today!&quot;
            </h2>
            <p className={"description"}>
              &quot;Have questions or ready to take the next step? Reach out to
              us today! Our team is here to assist you with all your real estate
              needs...&quot;
            </p>
          </div>

          <div className={"contactCards"}>
            <div className={"card"}>
              <div className={"iconContainer"}>
                <FaPhoneAlt className={"icon"} />
              </div>
              <h6 className={"cardTitle"}>01792 644023</h6>
              <p className={"cardText"}>
                &quot;Give Us a Call! Available Monday to Thursday, 9 AM - 5 PM,
                and Friday, 9 AM - 2 PM.&quot;
              </p>
            </div>

            <div className={"card"}>
              <div className={"iconContainer"}>
                <FaEnvelope className={"icon"} />
              </div>
              <h5 className={"cardTitle"}>enquiries@eiskenp.com</h5>
              <p className={"cardText"}>
                &quot;Reach Out Anytime! Email Us for a Prompt Response.&quot;
              </p>
            </div>

            <div className={"card"}>
              <div className={"iconContainer"}>
                <FaLocationArrow className={"icon"} />
              </div>
              <h5 className={"cardTitle"}>76 Mansel Street Swansea SA1 5TW</h5>
              <p className={"cardText"}>
                &quot;Visit Us. We look forward to welcoming you!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={"formSection"}>
        <div className={"container"}>
          <div className={"formWrapper"}>
            <div className={"formCard"}>
              <ContactForm
                description={true}
                heading="Want to Experience Excellence with Us?"
                generalQuery={true}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
