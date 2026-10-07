import "./Hero.css";
import heroImage from "../../assets/images/hero-boardroom.jpg"; // ← replace with your new image
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import useScrollToSection from "../../hooks/useScrollToSection";

const Hero = () => {
  const scrollToSection = useScrollToSection();

  return (
    <section className="hero" id="home">
      <ScrollReveal>
        <div className="hero-content">
          <h1>
            Connect. Collaborate.
            <br />
            Perform.
          </h1>

          <p>
            Enterprise Unified Communications, Audio-Visual and IT solutions
            designed for modern African organizations.
          </p>

          <button
            className="hero-btn"
            onClick={() => scrollToSection("schedule-demo")}
          >
            Book a Demo
          </button>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="3Verse Unified Communications" />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
