import { useEffect, useState } from "react";
import PortfolioCard from "../components/Portfolio/PortfolioCard";
import PortfolioSkeleton from "../components/PortfolioSkeleton/PortfolioSkeleton";
import PortfolioEmpty from "../components/PortfolioEmpty/PortfolioEmpty";
import { getPortfolioProjects } from "../services/portfolioService";
import "./PortfolioPage.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolioProjects();

        const portfolios = (data.portfolios || [])
          .filter((item) => item.isPublished)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        setProjects(portfolios);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <>
      <Navbar />

      {loading ? (
        <main className="portfolio-page">
          <section className="portfolio-grid">
            {[...Array(6)].map((_, index) => (
              <PortfolioSkeleton key={index} />
            ))}
          </section>
        </main>
      ) : !projects.length ? (
        <main className="portfolio-page">
          <PortfolioEmpty />
        </main>
      ) : (
        <main className="portfolio-page">
          <div className="portfolio-page-container">
            <span className="portfolio-page-tag">PROJECTS</span>

            <h1 className="portfolio-page-title">Our Success Stories</h1>

            <p className="portfolio-page-text">
              Explore some of the collaboration and communication solutions we
              have successfully delivered across different industries.
            </p>

            <div className="portfolio-grid">
              {projects.map((project) => (
                <PortfolioCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}
