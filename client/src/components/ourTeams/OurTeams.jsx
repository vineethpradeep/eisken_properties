import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./ourTeams.scss";

const teamMembers = [
  {
    name: "Kimberley Richards",
    role: "Director",
    image: "/images/kimberley.jpeg",
    socials: {
      twitter: "#",
      facebook: "#",
      instagram: "#",
    },
  },
  {
    name: "Sivaranjini",
    role: "Administrator",
    image: "/images/siva.jpg",
    socials: {
      twitter: "#",
      facebook: "#",
      instagram: "#",
    },
  },
  {
    name: "Aleshia",
    role: "Sales & Excutive",
    image: "/images/blankProfile.png",
    socials: {
      twitter: "#",
      facebook: "#",
      instagram: "#",
    },
  },
];

const OurTeams = () => {
  return (
    <section className="our-teams">
      <div className="container">
        <div className="our-teams__intro">
          <h2 className="our-teams__title">Here are our Teams</h2>
          <p className="our-teams__description">
            &quot;Our team at Eisken Properties is a dedicated group of
            professionals with diverse expertise in real estate. We are
            committed to delivering exceptional service, ensuring that each
            client’s unique needs are met with precision and care.&quot;
          </p>
        </div>

        <div className="our-teams__list">
          {teamMembers.map((member, index) => (
            <div className="our-teams__member" key={index}>
              <div className="our-teams__image-container">
                <img
                  src={member.image}
                  alt={member.name}
                  className="our-teams__image"
                />
              </div>
              <h5 className="our-teams__name">{member.name}</h5>
              <p className="our-teams__role">{member.role}</p>
              <div className="our-teams__socials">
                <a
                  href={member.socials.twitter}
                  className="our-teams__social twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href={member.socials.facebook}
                  className="our-teams__social facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href={member.socials.instagram}
                  className="our-teams__social instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeams;
