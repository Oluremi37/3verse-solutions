import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Portfolio.css";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import PortfolioCard from "./PortfolioCard";
import PortfolioSkeleton from "../PortfolioSkeleton/PortfolioSkeleton";

import { getPortfolioProjects } from "../../services/portfolioService";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ],
  );

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolioProjects();

        const portfolios = data.portfolios || [];

        const featured = portfolios
          .filter((item) => item.isPublished && item.isFeatured)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        setProjects(featured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const isThreeOrLess = projects.length <= 3;

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container">
        <span className="portfolio-tag">PROJECT</span>

        <h2 className="portfolio-heading">Our Success Stories</h2>

        {loading ? (
          <div className="portfolio-skeleton-grid">
            <PortfolioSkeleton />
            <PortfolioSkeleton />
            <PortfolioSkeleton />
          </div>
        ) : (
          <>
            <div className="portfolio-embla" ref={emblaRef}>
              <div
                className={`portfolio-track ${isThreeOrLess ? "centered" : ""}`}
              >
                {projects.map((project) => (
                  <div className="portfolio-slide" key={project._id}>
                    <PortfolioCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            <div className="portfolio-footer">
              <Link to="/portfolio" className="portfolio-btn">
                View All 
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
