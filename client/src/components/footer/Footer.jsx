import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  const copyPolicyYear = new Date().getFullYear();
  return (
    <footer>
      <div className="svg-divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
      <div className="footerContainer">
        <div className="left-section">
          <h4>Let&apos;s keep in touch!</h4>
          <p>Eisken Properties, will respond 1-2 business days.</p>
          <div className="social-buttons">
            <button className="twitter">
              <FaTwitter />
            </button>
            <button className="facebook">
              <FaFacebook />
            </button>
            <button className="instagram">
              <FaInstagram />
            </button>
            <button className="tiktok">
              <FaTiktok />
            </button>
          </div>
        </div>
        <div className="right-section">
          <div className="link-group">
            <span>Useful Links</span>
            <ul>
              <li>
                <a href="/aboutus">About Us</a>
              </li>
              <li>
                <a href="">Policies</a>
              </li>
              <li>
                <a href="">Privacy Notice</a>
              </li>
              <li>
                <a href="">Complaints Procedure</a>
              </li>
            </ul>
          </div>
          <div className="link-group">
            <span>Other Resources</span>
            <ul>
              <li>
                <a href="">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom-section">
          <hr />
          <p className="footer-bottom">
            &copy; {copyPolicyYear} Eisken Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
