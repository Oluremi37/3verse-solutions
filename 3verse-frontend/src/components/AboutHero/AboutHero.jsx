import ScrollReveal from "../ScrollReveal/ScrollReveal";
import "./AboutHero.css";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-container">
        <ScrollReveal>
          <span className="about-tag">ABOUT 3VERSE</span>

          <h1>
            Delivering Innovative
            <span> ICT & Telecom Solutions</span>
          </h1>

          <p>
            3VERSE SOLUTIONS LIMITED delivers innovative communication,
            collaboration, and technology solutions that help organizations
            connect, communicate, and grow. We specialize in Unified
            Communications, Video Conferencing, IP Telephony, Digital Signage,
            Audio-Visual Systems, and Technology Integration for businesses and
            institutions.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
