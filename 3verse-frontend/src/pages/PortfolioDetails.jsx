import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { getPortfolioProject } from "../services/portfolioService";

import "./PortfolioDetails.css";

export default function PortfolioDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getPortfolioProject(id);

        setProject(data.portfolio);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="portfolio-loading">Loading project...</div>

        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />

        <div className="portfolio-loading">Project not found.</div>

        <Footer />
      </>
    );
  }

  const images = project.images || [];

  return (
    <>
      <Navbar />

      <section className="portfolio-details">
        <div className="portfolio-details-container">
          <div className="portfolio-gallery">
            <div className="portfolio-main-image">
              <img src={images[activeImage]} alt="Portfolio" />
            </div>

            {images.length > 1 && (
              <div className="portfolio-image-list">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className={activeImage === index ? "active" : ""}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="portfolio-info">
            <Link to="/portfolio" className="back-to-portfolio">
              ← Back to Projects
            </Link>

            {project.title && (
              <h1 className="portfolio-title">{project.title}</h1>
            )}

          

            <div className="portfolio-section">
              <h3>Project Overview</h3>

              <p>{project.description}</p>
            </div>

            <div className="portfolio-section">
              <h3>Result</h3>

              <div className="portfolio-result-box">{project.result}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}