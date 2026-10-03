import "./Hero.css";
import earth from "../../assets/images/3verse-logo-4.png";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import useScrollToSection from "../../hooks/useScrollToSection";

const Hero = () => {
  const scrollToSection = useScrollToSection();

  return (
    <section className="hero" id="home">
      <ScrollReveal>
        <div className="hero-content">
          <h1>
            Connecting People.
            <br />
            Transforming Businesses.
          </h1>

          <p>
            3VERSE SOLUTIONS LIMITED delivers world-class unified
            communications, video conferencing, IP telephony, digital signage,
            audio-visual, and systems integration solutions that help
            organizations connect, collaborate, and grow.
          </p>

          <button
            className="hero-btn"
            onClick={() => scrollToSection("schedule-demo")}
          >
            Book a Demo
          </button>
        </div>

        <div className="hero-image">
          <img src={earth} alt="Earth" />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
