import { useEffect, useState } from "react";

import "./TeamPage.css";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { getTeamMembers } from "../services/teamService";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";

import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

export default function TeamPage() {
  const [loading, setLoading] = useState(true);

  const [md, setMd] = useState(null);
  const [cto, setCto] = useState(null);
  const [management, setManagement] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getTeamMembers();

        const members = data.teamMembers || [];

        const published = members.filter((member) => member.isPublished);

        setMd(
          published.find((member) => member.teamType === "Managing Director") ||
            null,
        );

        setCto(
          published.find(
            (member) => member.teamType === "Chief Technology Officer",
          ) || null,
        );

        setManagement(
          published
            .filter((member) => member.teamType === "Management")
            .sort((a, b) => a.displayOrder - b.displayOrder),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);
if (loading) {
  return (
    <>
      <Navbar />

      <main className="team-page">
        <section className="team-hero">
          <div className="team-hero-content">
            <SkeletonLoader width="320px" height="55px" />

            <div style={{ marginTop: "25px" }}>
              <SkeletonLoader width="600px" height="20px" />
            </div>

            <div style={{ marginTop: "10px" }}>
              <SkeletonLoader width="500px" height="20px" />
            </div>
          </div>
        </section>

        {[1, 2].map((item) => (
          <section className="executive-section" key={item}>
            <SkeletonLoader width="399px" height="385px" borderRadius="20px" />

            <div>
              <SkeletonLoader width="260px" height="40px" />

              <div style={{ marginTop: "15px" }}>
                <SkeletonLoader width="180px" height="20px" />
              </div>

              <div style={{ marginTop: "30px" }}>
                <SkeletonLoader width="100%" height="18px" />
              </div>

              <div style={{ marginTop: "10px" }}>
                <SkeletonLoader width="100%" height="18px" />
              </div>

              <div style={{ marginTop: "10px" }}>
                <SkeletonLoader width="85%" height="18px" />
              </div>
            </div>
          </section>
        ))}

        <section className="management">
          <div className="management-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonLoader key={item} height="460px" borderRadius="20px" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

  return (
    <>
      <Navbar />

      <main className="team-page">
        {/* HERO */}

        <section className="team-hero">
          <div className="team-hero-content">
            <h1>Meet Our Team</h1>

            <p>
              Meet the talented individuals driving innovation, collaboration
              and excellence across our organization.
            </p>
          </div>
        </section>

        {/* Managing Director */}

        {md && (
          <section className="executive-section">
            <div className="executive-image">
              <img src={md.image} alt={md.fullName} />
            </div>

            <div className="executive-content">
              <h2>{md.fullName}</h2>

              <h4>{md.position}</h4>

              <p>{md.bio}</p>

              <div className="social-icons">
                {md.linkedin && (
                  <a href={md.linkedin} target="_blank" rel="noreferrer">
                    <FaLinkedinIn />
                  </a>
                )}

                {md.twitter && (
                  <a href={md.twitter} target="_blank" rel="noreferrer">
                    <FaTwitter />
                  </a>
                )}

                {md.instagram && (
                  <a href={md.instagram} target="_blank" rel="noreferrer">
                    <FaInstagram />
                  </a>
                )}

                {md.facebook && (
                  <a href={md.facebook} target="_blank" rel="noreferrer">
                    <FaFacebook />
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTO */}

        {cto && (
          <section className="executive-section reverse">
            <div className="executive-content">
              <h2>{cto.fullName}</h2>

              <h4>{cto.position}</h4>

              <p>{cto.bio}</p>

              <div className="social-icons">
                {cto.linkedin && (
                  <a href={cto.linkedin} target="_blank" rel="noreferrer">
                    <FaLinkedinIn />
                  </a>
                )}

                {cto.twitter && (
                  <a href={cto.twitter} target="_blank" rel="noreferrer">
                    <FaTwitter />
                  </a>
                )}

                {cto.instagram && (
                  <a href={cto.instagram} target="_blank" rel="noreferrer">
                    <FaInstagram />
                  </a>
                )}

                {cto.facebook && (
                  <a href={cto.facebook} target="_blank" rel="noreferrer">
                    <FaFacebook />
                  </a>
                )}
              </div>
            </div>

            <div className="executive-image">
              <img src={cto.image} alt={cto.fullName} />
            </div>
          </section>
        )}

        {/* Management */}

        <section className="management">
          <div className="management-top">
            <div>
              <h2>Management Team</h2>
            </div>

            <div>
              <p>
                Get to know the experts who bring passion, creativity and
                experience to everything we do.
              </p>
            </div>
          </div>

          <div className="management-grid">
            {management.map((member) => (
              <div className="management-card" key={member._id}>
                <img src={member.image} alt={member.fullName} />

                <div className="management-overlay">
                  <h3>{member.fullName}</h3>

                  <span>{member.position}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
