import "./ContactUs.css";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiHeadphones,
  FiMessageCircle,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

const features = [
  {
    icon: <FiHeadphones />,
    title: "Talk to an Expert",
    text: "Get personalized solutions for your business.",
  },
  {
    icon: <FiMessageCircle />,
    title: "Quick Response",
    text: "We respond to all inquiries within 24 hours.",
  },
  {
    icon: <FiShield />,
    title: "Trusted Partner",
    text: "Reliable solutions from globally recognized brands.",
  },
  {
    icon: <FiRefreshCw />,
    title: "End-to-End Support",
    text: "From consultation to implementation and ongoing support.",
  },
];

export default function ContactUs() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <ScrollReveal>
          <div className="contact-header">
            <span className="contact-tag">VISIT OUR OFFICE</span>
            <h2>Let's Build Better Communication Together</h2>
            <p>
              Whether you're planning a new communication infrastructure,
              upgrading your collaboration tools, or exploring enterprise IT
              solutions, our team is ready to help.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="contact-map-wrapper">
            <div className="contact-card">
              <div className="contact-info">
                <div className="contact-icon">
                  <FiMapPin />
                </div>
                <div>
                  <h4>Address</h4>
                  <p>
                    Plot PC 12, Churchgate street, Victoria Island, Lagos,
                    Nigeria.
                  </p>
                </div>
              </div>

              <div className="contact-info">
                <div className="contact-icon">
                  <FiPhone />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+234 8135710769</p>
                  {/* <p>+234 808 125 0063</p> */}
                </div>
              </div>

              <div className="contact-info">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>3versesltd@gmail.com</p>
                </div>
              </div>

              <div className="contact-info">
                <div className="contact-icon">
                  <FiClock />
                </div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday</p>
                  <p> 7 a.m. to 4 p.m</p>
                </div>
              </div>

              <div className="contact-buttons">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Plot+PC+12+Churchgate+Street+Victoria+Island+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-directions"
                >
                  Get Directions
                </a>
                <a
                  href="https://wa.me/2348135710769?text=Hi%2C%20I%27d%20like%20to%20speak%20with%20your%20sales%20team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-contact-sales"
                >
                  Contact Sales
                </a>
              </div>

              <Link to="/contact" className="btn-send-message">
                Send us a Message
              </Link>
            </div>

            <div className="contact-map">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps?q=Churchgate+Street,+Victoria+Island,+Lagos,+Nigeria&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>

        <div className="contact-features">
          {features.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="feature-item">
                <div className="feature-icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
