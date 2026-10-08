import "./Hero.css";
import heroImage from "../../assets/images/hero-boardroom-1.jpg"; // replace with your new image
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import useScrollToSection from "../../hooks/useScrollToSection";

const Hero = () => {
  const scrollToSection = useScrollToSection();

  return (
    <section className="hero" id="home">
      <ScrollReveal>
        <div className="hero-content">
          <span className="hero-tag">Unified Communications • AV • IT</span>

          <h1>
            Connect. Collaborate.
            <br />
            Perform.
          </h1>

          <p>
            Enterprise communication and technology solutions designed for
            modern African organizations.
          </p>

          <div className="hero-actions">
            <button
              className="hero-btn primary"
              onClick={() => scrollToSection("schedule-demo")}
            >
              Book a Demo
            </button>

            <button
              className="hero-btn secondary"
              onClick={() => scrollToSection("services")}
            >
              Explore Services
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="3Verse Unified Communications" />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
