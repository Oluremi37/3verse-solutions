import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./OurStoryPage.css";

import storyImage from "../assets/images/ourStory.png"; 

export default function OurStoryPage() {
  return (
    <>
      <Navbar />

      <section className="story-hero">
        <div className="story-hero-container">
          <div className="story-hero-content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to="/about">About Us</Link>
              <span>›</span>
              <span className="current">Our Story</span>
            </div>

            <h1>Our Story</h1>
            {/* <div className="green-line"></div> */}

            <p className="story-intro">
              Every successful digital transformation begins with a commitment
              to innovation and meaningful collaboration.
            </p>

            <p>
              3VERSE SOLUTIONS LIMITED was established to help organizations
              navigate an increasingly connected world through advanced
              communication, collaboration, and technology solutions. Founded on
              the belief that technology should simplify communication and
              improve productivity, we deliver solutions that bring people,
              systems, and ideas together.
            </p>

            <p>
              Today, we partner with businesses, government institutions, and
              organizations to deploy unified communications, video
              conferencing, IP telephony, digital signage, and integrated
              technology solutions that drive efficiency, connectivity, and
              growth.
            </p>
          </div>

          <div className="story-hero-image">
            <img src={storyImage} alt="Our Story" />
          </div>
        </div>
      </section>

      {/* Next / Previous Navigation */}
      <div className="page-nav">
        <div className="page-nav-container">
          <Link to="/about" className="page-nav-link prev">
            ← About Us
          </Link>
          <Link to="/about/mission" className="page-nav-link next">
            Our Mission →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
