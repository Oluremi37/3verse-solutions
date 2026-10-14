
import { Link } from "react-router-dom";
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
import extron from "../assets/images/extron.png";
import abuja from "../assets/images/abuja.png";

const values = [
  "Innovation",
  "Integrity",
  "Excellence",
  "Customer-Centricity",
  "Collaboration",
  "Impact",
];

const partners = [
  { name: "Logitech", image: logitech },
  { name: "Cisco", image: cisco },
  { name: "Poly", image: poly },
  { name: "Huawei", image: huawei },
  { name: "Avaya", image: avaya },
  { name: "Microsoft", image: microsoft },
  { name: "IBM", image: ibm },
  { name: "Dell", image: dell },
  { name: "Samsung", image: samsung },
  { name: "Extron", logo: extron },
  { name: "Abuja", logo: abuja },
];

const services = [
  {
    number: "01",
    title: "Unified Communications",
    description:
      "Empowering organizations with integrated communication platforms that enable seamless voice, messaging, collaboration, and customer engagement across teams.",
    label: "CONNECT",
  },
  {
    number: "02",
    title: "Video Conferencing & Collaboration ",
    description:
      "Designing and deploying modern meeting solutions that connect people, enhance productivity, and support hybrid work environments. ",
    label: "INNOVATE",
  },
  {
    number: "03",
    title: "Systems Integration ",
    description:
      "Bringing together communication, AV, cloud, and enterprise technologies to create connected, efficient, and future-ready business operations. ",
    label: "COLLABORATE",
  },
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
            Empowering Communication.
            <br />
            Driving Digital Transformation.
          </h1>

          <p>
            We deliver world-class unified communications, collaboration, and
            technology solutions that help organizations connect seamlessly,
            improve productivity, and accelerate business growth.
          </p>
        </div>
      </section>

      <main className="about-page-main">
        {/* WHO WE ARE */}
        <section className="about-who-section">
          <div className="about-page-container">
            <div className="about-who-layout">
              <div className="about-who-intro">
                <span className="about-eyebrow">
                  <span className="about-eyebrow-line" />
                  WHO WE ARE
                </span>

                <h2>
                  Enabling Smarter Communication{" "}
                  <span>for Modern Businesses.</span>
                </h2>

                <p className="about-who-lead">
                  We help businesses build better connections through dependable
                  communication and IT solutions.
                </p>

                <Link to="/services" className="about-text-link">
                  Explore our services <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="about-who-details">
                <div className="about-who-index" aria-hidden="true">
                  3V
                </div>

                <p>
                  3VERSE Solutions Limited delivers innovative communication,
                  collaboration, and technology solutions that help
                  organizations connect, operate efficiently, and achieve their
                  business objectives.
                </p>

                <p>
                  We combine industry expertise, world-class technologies, and
                  customer-focused service to design and implement solutions
                  that drive productivity, enhance collaboration, and support
                  digital transformation.
                </p>

                <p>
                  Our approach is centred on delivering solutions that are
                  flexible, accessible and built around the needs of the
                  organisations we serve.
                </p>

                <div className="about-who-footer">
                  <span>PEOPLE</span>
                  <span className="about-who-footer-dot" />
                  <span>TECHNOLOGY</span>
                  <span className="about-who-footer-dot" />
                  <span>POSSIBILITIES</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="about-what-section">
          <div className="about-page-container">
            <div className="about-what-heading">
              <div>
                <span className="about-eyebrow">
                  <span className="about-eyebrow-line" />
                  WHAT WE DO
                </span>

                <h2>
                  Delivering Technology That
                  <br />
                  <span>Connects and Empowers.</span>
                </h2>
              </div>

              <p>
                We provide unified communications, collaboration, and technology
                solutions that help organizations improve productivity,
                strengthen connectivity, and accelerate digital transformation.
              </p>
            </div>

            <div className="about-what-grid">
              {services.map((service) => (
                <article className="about-what-card" key={service.number}>
                  <div className="about-what-card-top">
                    <span className="about-what-number">{service.number}</span>
                    <span className="about-what-label">{service.label}</span>
                  </div>

                  <div className="about-what-card-body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <div className="about-what-card-bottom">
                    <span>3Verse Solutions</span>
                    <span className="about-card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION, VISION AND VALUES */}
        <section className="about-values-section">
          <div className="about-page-container">
            <div className="about-values-heading">
              <span className="about-eyebrow">
                <span className="about-eyebrow-line" />
                WHAT DRIVES US
              </span>

              <h2>
                Guided by purpose.
                <br />
                <span>Driven by possibilities.</span>
              </h2>

              <p>
                Our purpose, ambition and principles shape how we serve our
                customers and approach every solution.
              </p>
            </div>

            <div className="about-values-layout">
              <article className="about-purpose-card about-mission-card">
                <div className="about-purpose-top">
                  <div className="about-purpose-icon">
                    <img src={missionIcon} alt="" />
                  </div>
                  <span className="about-purpose-number">01 / PURPOSE</span>
                </div>

                <h3>Our Mission</h3>

                <p>
                  To deliver innovative, reliable, and scalable technology
                  solutions that help organizations communicate, collaborate,
                  and succeed in a digitally connected world.
                </p>

                <span className="about-purpose-accent" />
              </article>

              <article className="about-purpose-card about-vision-card">
                <div className="about-purpose-top">
                  <div className="about-purpose-icon">
                    <img src={visionIcon} alt="" />
                  </div>
                  <span className="about-purpose-number">02 / AMBITION</span>
                </div>

                <h3>Our Vision</h3>

                <p>
                  To be a leading technology solutions provider, delivering
                  world-class unified communications, digital transformation,
                  and collaboration solutions that connect people, businesses,
                  and communities.
                </p>

                <span className="about-purpose-accent" />
              </article>

              <article className="about-core-values-card">
                <div className="about-core-values-heading">
                  <div className="about-purpose-icon">
                    <img src={valuesIcon} alt="" />
                  </div>

                  <span className="about-purpose-number">03 / PRINCIPLES</span>
                </div>

                <h3>Our Core Values</h3>

                <p className="about-core-values-intro">
                  The principles behind the way we work.
                </p>

                <ul>
                  {values.map((value, index) => (
                    <li key={value}>
                      <span className="about-value-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{value}</span>
                      <span className="about-value-check" aria-hidden="true">
                        ↗
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="about-partners-section">
          <div className="about-page-container">
            <div className="about-partners-heading">
              <div>
                <span className="about-eyebrow">
                  <span className="about-eyebrow-line" />
                  OUR PARTNERS
                </span>

                <h2>
                  TRUSTED
                  <br />
                  <span>PARTNERS </span>
                </h2>
              </div>

              <p>
                We collaborate with leading global technology providers to
                deliver innovative, reliable, and scalable communication,
                collaboration, and digital transformation solutions for our
                clients.
              </p>
            </div>

            <div className="about-partners-grid">
              {partners.map((partner, index) => (
                <div className="about-partner-logo" key={partner.name}>
                  <span className="about-partner-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <img src={partner.image} alt={partner.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="about-page-cta">
          <div className="about-page-cta-container">
            <div className="about-cta-copy">
              <span className="about-eyebrow">
                <span className="about-eyebrow-line" />
                LET'S CONNECT
              </span>

              <h2>
                Let's build better
                <br />
                <span>ways to connect.</span>
              </h2>

              <p>
                Talk to our team about communication and technology solutions
                designed around your business needs.
              </p>
            </div>

            <div className="about-cta-action">
              <Link to="/contact" className="about-cta-button">
                Get in Touch <span aria-hidden="true">↗</span>
              </Link>

              <span className="about-cta-note">
                Let's discuss what your business needs.
              </span>
            </div>

            <span className="about-cta-decoration" aria-hidden="true">
              3V
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

