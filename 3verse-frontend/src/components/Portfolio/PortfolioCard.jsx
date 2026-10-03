import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLink2 } from "react-icons/fi";

import PortfolioLightbox from "../PortfolioLightbox/PortfolioLightbox";

import "./PortfolioCard.css";

export default function PortfolioCard({ project }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = project.images || [];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const openLightbox = (e) => {
    e.preventDefault();
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Link to={`/portfolio/${project._id}`} className="portfolio-card-link">
        <article className="portfolio-card">
          {/* Main Image */}
          <div className="portfolio-image">
            {images.length > 0 && (
              <img
                src={images[activeImage]}
                alt={project.title || "Portfolio Project"}
                onClick={openLightbox}
                style={{ cursor: "zoom-in" }}
              />
            )}

            {project.showIndustry && project.industry && (
              <span className="industry-tag">{project.industry}</span>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="portfolio-thumbnails">
              {images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={activeImage === index + 1 ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveImage(index + 1);
                  }}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="portfolio-content">
            <div className="portfolio-text">
              {project.showTitle && project.title && <h3>{project.title}</h3>}

              <p>{project.description}</p>
            </div>

            <div className="portfolio-result">
              {project.result?.includes("100%") ? (
                <span className="result-check">✓</span>
              ) : (
                <FiLink2 className="result-icon" />
              )}

              <span>{project.result}</span>
            </div>
          </div>
        </article>
      </Link>

      {isLightboxOpen && (
        <PortfolioLightbox
          images={images}
          currentIndex={activeImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}
