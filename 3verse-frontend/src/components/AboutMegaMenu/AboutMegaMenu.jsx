import { Link } from "react-router-dom";
import { FiFileText, FiTarget, FiUsers } from "react-icons/fi";
import "./AboutMegaMenu.css";

const aboutLinks = [
  {
    icon: <FiFileText />,
    title: "Our Story",
    description: "The journey behind our vision",
    path: "/about/story",
  },
  {
    icon: <FiTarget />,
    title: "Our Mission",
    description: "Driving impact through technology",
    path: "/about/mission",
  },
  {
    icon: <FiUsers />,
    title: "Management Team",
    description: "Meet the leaders driving 3Verse",
    path: "/team",
  },
];

export default function AboutMegaMenu({ onLinkClick }) {
  return (
    <div className="about-mega-menu">
      <div className="about-mega-content">
        <div className="about-mega-column">
          <h5 className="about-mega-heading">About 3Verse Solution Limited</h5>

          {aboutLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="about-mega-item"
              onClick={onLinkClick}
            >
              <span className="about-mega-icon">{item.icon}</span>

              <div className="about-mega-text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/*
        <div className="about-mega-sister-column">
          <h5 className="about-mega-heading">Our Sister Company</h5>

          <div className="sister-company-card">
            <img
              src={sisterLogo}
              alt="Telvida International Systems Limited"
              className="sister-company-logo"
            />

            <p className="sister-company-text">
              Telvida International Systems Limited delivers innovative
              <br />
              technology and system integration solutions that
              <br />
              empower businesses globally.
            </p>

            <a
              href="https://telvida.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sister-company-btn"
              onClick={onLinkClick}
            >
              Visit Website <FiExternalLink />
            </a>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
