import "./ContactHero.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

export default function ContactHero() {
  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="contact-hero">
      <div className="contact-hero-container">
        <ScrollReveal>
          <span className="contact-hero-tag">CONTACT US</span>

          <h1>
            Let's Start a <span>Conversation</span>
          </h1>

          <p>
            Whether you're looking for enterprise communication solutions,
            managed IT services, cybersecurity, networking, or simply have a
            question, our team is ready to help.
          </p>

          <div className="contact-hero-buttons">
            <button className="hero-primary-btn" onClick={scrollToForm}>
              Send a Message
            </button>

            {/* <a href="tel:+2348133809668" className="hero-secondary-btn">
              Call Us
            </a> */}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
