import "./About.css";

const coreValues = [
  {
    title: "Innovation",
    description: "Continuously creating smarter technology solutions.",
  },
  {
    title: "Integrity",
    description: "Building trust through honesty and transparency.",
  },
  {
    title: "Excellence",
    description: "Delivering quality beyond expectations.",
  },
  {
    title: "Customer-Centricity",
    description: "Putting clients first in everything we do.",
  },
  {
    title: "Collaboration",
    description: "Working together to achieve greater outcomes.",
  },
  {
    title: "Impact",
    description: "Creating measurable value for our clients and communities.",
  },
];

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* Heading */}
        <div className="about-heading">
          <h2>About Us</h2>
          <p>
            3VERSE SOLUTIONS LIMITED delivers innovative communication,
            collaboration, and technology solutions that help organizations
            connect, communicate, and grow. We specialize in Unified
            Communications, Video Conferencing, IP Telephony, Digital Signage,
            Audio-Visual Systems, and Technology Integration for businesses and
            institutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mv-grid">
          <div className="mv-card mission">
            <span className="mv-tag">Mission</span>
            <h3>Our Mission</h3>
            <p>
              To deliver innovative, reliable, and scalable technology solutions
              that help organizations communicate, collaborate, and succeed in a
              digitally connected world.
            </p>
          </div>

          <div className="mv-card vision">
            <span className="mv-tag">Vision</span>
            <h3>Our Vision</h3>
            <p>
              To be a leading technology solutions provider, delivering
              world-class unified communications, digital transformation, and
              collaboration solutions that connect people, businesses, and
              communities.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="core-values">
          <div className="core-values-header">
            <span className="mv-tag">Core Values</span>
            <h3>What drives us</h3>
          </div>

          <div className="values-grid">
            {coreValues.map((value) => (
              <div className="value-item" key={value.title}>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
