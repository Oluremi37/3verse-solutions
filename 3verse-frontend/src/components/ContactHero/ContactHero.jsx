
import "./ContactHero.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

export default function ContactHero() {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="contact-hero">
      <div className="contact-hero__orb contact-hero__orb--left" aria-hidden="true" />
      <div className="contact-hero__orb contact-hero__orb--right" aria-hidden="true" />

      <div className="contact-hero-container">
        <ScrollReveal>
          <span className="contact-hero-tag">
            <span className="contact-hero-tag__dot" />
            CONTACT 3VERSE
          </span>

          <h1>
            Let’s Build Smarter Communication{" "}
            <span>Solutions Together.</span>
          </h1>

          <p>
            Whether you’re deploying unified communications, upgrading meeting
            spaces, or driving digital transformation, our experts are ready to
            help your business connect and work better.
          </p>

          <div className="contact-hero-buttons">
            <button
              type="button"
              className="hero-primary-btn"
              onClick={scrollToForm}
            >
              Send a Message
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="contact-hero-note">
            <span className="contact-hero-note__line" />
            Communication. Collaboration. Possibilities.
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

