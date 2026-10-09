import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Team.css";

import { getTeamMembers } from "../../services/teamService";

import ScrollReveal from "../ScrollReveal/ScrollReveal";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

export default function Team() {
  const [previewMembers, setPreviewMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getTeamMembers();

        const members = Array.isArray(data) ? data : data?.teamMembers || [];

        const previews = members
          .filter((member) => member.isPublished && member.isPreview)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        setPreviewMembers(previews);
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
      <section className="team">
        <div className="team-container">
          <div className="team-top">
            <div>
              <SkeletonLoader width="140px" height="16px" />

              <div style={{ marginTop: "20px" }}>
                <SkeletonLoader width="280px" height="45px" />
              </div>

              <div style={{ marginTop: "18px" }}>
                <SkeletonLoader width="500px" height="18px" />
              </div>

              <div style={{ marginTop: "10px" }}>
                <SkeletonLoader width="420px" height="18px" />
              </div>
            </div>

            <SkeletonLoader width="150px" height="50px" borderRadius="999px" />
          </div>

          <div className="team-slider">
            {[1, 2, 3, 4].map((item) => (
              <SkeletonLoader key={item} height="560px" borderRadius="24px" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="team" id="team">
      <div className="team-container">
        <div className="team-top">
          <ScrollReveal>
            <div className="team-top-text">
              <span className="team-small-title">OUR PROFESSIONALS</span>

              <h2>Meet Our Team</h2>

              <p>
                Meet the passionate professionals driving innovation,
                collaboration and excellence across our organization.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link to="/team" className="view-team">
              View Team
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="team-slider static">
            {previewMembers.map((member) => (
              <div key={member._id} className="team-item static">
                <img src={member.image} alt={member.fullName} />

                <div className="team-content">
                  <div>
                    <h3>{member.fullName}</h3>

                    <span>{member.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
