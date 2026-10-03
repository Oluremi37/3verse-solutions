import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./OurMissionPage.css";

 import missionImage from "../assets/images/mission-bg.png"; 

export default function OurMissionPage() {
  return (
    <>
      <Navbar />

      <section className="mission-hero">
        <div className="mission-hero-container">
          <div className="mission-hero-content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to="/about">About Us</Link>
              <span>›</span>
              <span className="current">Our Mission</span>
            </div>

            <h1>Our Mission</h1>
            {/* <div className="green-line"></div> */}

            <p className="mission-intro">
              To deliver innovative, reliable, and scalable technology solutions
              that help organizations communicate, collaborate, and succeed in a
              digitally connected world.
            </p>

            <p>
              To be a leading technology solutions provider, delivering
              world-class unified communications, digital transformation, and
              collaboration solutions that connect people, businesses, and
              communities.
            </p>

            <p>
              We are committed to delivering flexible, reliable and future-ready
              solutions that help organizations stay connected, collaborate
              effectively and grow with confidence.
            </p>
          </div>

          <div className="mission-hero-image">
            <img src={missionImage} alt="Our Mission" />
          </div>
        </div>
      </section>

      {/* Next / Previous Navigation */}
      <div className="page-nav">
        <div className="page-nav-container">
          <Link to="/about/story" className="page-nav-link prev">
            ← Our Story
          </Link>
          <Link to="/about" className="page-nav-link next">
            About Us →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
