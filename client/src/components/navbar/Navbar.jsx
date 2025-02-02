import { FaBars } from "react-icons/fa";
import "./navbar.scss";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/useNotificationStore.js";

function Navbar() {
  const [menuOpen, setmenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state?.fetch);
  const number = useNotificationStore((state) => state?.number);

  if (currentUser) fetch();
  return (
    <header>
      <nav>
        <div className="logo">
          <Link href="/">
            <img src="images/logo.png" alt="Eisken properties logo" />
          </Link>
        </div>
        <div className="centerMenu">
          <Link to="/properties">Properties</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="loginMenu">
          {currentUser ? (
            <div className="user">
              <img
                src={currentUser?.avatar || "images/blankProfile.png"}
                alt="User Image"
              />
              <span>{currentUser?.username}</span>
              <Link to="/profile" className="profile">
                {number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="signin">
                Sign in
              </Link>
            </>
          )}

          <div
            className={menuOpen ? "mobileMenuBar active" : "mobileMenuBar"}
            onClick={() => setmenuOpen((prev) => !prev)}
          >
            <FaBars />
          </div>
          {/* <div className={menuOpen ? "mobileMenu active" : "mobileMenu"}>
            <div className="spacer">
              <Link href="/">Properties</Link>
              <Link href="/">About</Link>
              <Link href="/">Contact</Link>
            </div>
            <div className="divider"></div>
            <div className="mblogin">
              <Link href="/">Sign in</Link>
              <Link href="/">Sign up</Link>
            </div>
          </div> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
