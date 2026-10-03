import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./AboutPage.css";

import missionIcon from "../assets/icons/mission.png";
import visionIcon from "../assets/icons/vision.png";
import valuesIcon from "../assets/icons/values.png";

import logitech from "../assets/images/logitech.png";
import cisco from "../assets/images/cisco.png";
import poly from "../assets/images/poly.png";
import huawei from "../assets/images/huawei.png";
import avaya from "../assets/images/avaya.png";
import microsoft from "../assets/images/microsoft.png";
import ibm from "../assets/images/ibm.png";
import dell from "../assets/images/dell.png";
import samsung from "../assets/images/samsung.png";

const values = [
  "Integrity and Honesty",
  "Expertise",
  "Passion",
  "Boldness",
  "Self critical",
  "Accountability",
];

const partners = [
  logitech,
  cisco,
  poly,
  huawei,
  avaya,
  microsoft,
  ibm,
  dell,
  samsung,
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="about-page-hero">
        <div className="about-page-hero-container">
          <span className="about-page-tag">ABOUT 3VERSE</span>

          <h1>
            Connecting People.
            <br />
            Enabling Possibilities.
          </h1>

          <p>
            We deliver flexible and affordable communication solutions that help
            businesses connect, collaborate and grow seamlessly.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-who-section">
        <div className="about-page-container">
          <div className="about-who-grid">
            <div className="about-who-heading">
              <span className="section-tag">WHO WE ARE</span>

              <h2>Technology that brings people and businesses closer.</h2>
            </div>

            <div className="about-who-content">
              <p>
                3VERSE SOLUTIONS LIMITED provides communication and IT solutions
                designed to help businesses connect, collaborate and operate
                more effectively.
              </p>

              <p>
                We combine technology, expertise and customer-focused solutions
                to address the communication needs of modern businesses.
              </p>

              <p>
                Our approach is centred on delivering solutions that are
                flexible, accessible and built around the needs of the
                organisations we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="about-what-section">
        <div className="about-page-container">
          <div className="about-section-heading">
            <span className="section-tag">WHAT WE DO</span>

            <h2>Helping businesses communicate better</h2>

            <p>
              We provide communication and technology solutions that support
              seamless collaboration and connectivity.
            </p>
          </div>

          <div className="about-what-grid">
            <div className="about-what-card">
              <span>01</span>
              <h3>Business Communication</h3>
              <p>
                Communication solutions designed to help teams and businesses
                stay connected and collaborate effectively.
              </p>
            </div>

            <div className="about-what-card">
              <span>02</span>
              <h3>Technology Solutions</h3>
              <p>
                Technology solutions that help organisations improve their
                operations and stay connected in a changing digital world.
              </p>
            </div>

            <div className="about-what-card">
              <span>03</span>
              <h3>Collaboration</h3>
              <p>
                Solutions that make communication and collaboration easier
                across teams, locations and business environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="about-values-section">
        <div className="about-page-container">
          <div className="about-section-heading">
            <span className="section-tag">WHAT DRIVES US</span>

            <h2>Our Mission, Vision & Values</h2>

            <p>
              The principles that guide how we serve our customers and build
              solutions.
            </p>
          </div>

          <div className="about-values-grid">
            {/* MISSION */}
            <div className="about-value-card">
              <div className="about-value-icon mission-icon">
                <img src={missionIcon} alt="Mission" />
              </div>

              <h3>Mission</h3>

              <p>
                To deliver innovative, reliable, and scalable technology solutions
                that help organizations communicate, collaborate, and succeed in a
                digitally connected world.
              </p>
            </div>

            {/* VISION */}
            <div className="about-value-card">
              <div className="about-value-icon vision-icon">
                <img src={visionIcon} alt="Vision" />
              </div>

              <h3>Vision</h3>

              <p>
                To become a world class telecommunications company connecting
                people and businesses across borders and enabling seamless
                global communication.
              </p>
            </div>

            {/* VALUES */}
            <div className="about-value-card">
              <div className="about-value-icon values-icon">
                <img src={valuesIcon} alt="Core Values" />
              </div>

              <h3>Core Values</h3>

              <ul>
                {values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="about-partners-section">
        <div className="about-page-container">
          <div className="about-section-heading">
            <span className="section-tag">OUR PARTNERS</span>

            <h2>Working with trusted technology leaders</h2>

            <p>
              Partnering with global technology leaders to deliver innovative,
              secure and scalable communication solutions.
            </p>
          </div>

          <div className="about-partners-grid">
            {partners.map((partner, index) => (
              <div className="about-partner-logo" key={index}>
                <img src={partner} alt={`Technology partner ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-page-cta">
        <div className="about-page-cta-container">
          <div>
            <span className="section-tag">LET'S CONNECT</span>

            <h2>Ready to improve the way your business communicates?</h2>

            <p>
              Talk to our team about communication and technology solutions
              designed around your business needs.
            </p>
          </div>

          <a href="/contact" className="about-cta-button">
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
