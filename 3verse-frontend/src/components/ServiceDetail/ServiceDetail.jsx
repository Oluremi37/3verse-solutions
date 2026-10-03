import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { getServiceBySlug } from "../../services/serviceService";
// import ProductsCatalog from "../ProductsCatalog/ProductsCatalog";
// import ProjectCTA from "../ProjectCTA/ProjectCTA";
import { FiCheck } from "react-icons/fi";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        const data = await getServiceBySlug(slug);
        setService(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadService();
  }, [slug]);
  if (service === null) {
    return (
      <>
        <Navbar />
        <div className="service-not-found">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!service) {


    return (
      <>
        <Navbar />
        <div className="service-not-found">
          <h2>Service not found</h2>
          <Link to="/">Back to Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="service-hero">
        <div className="service-hero-content">
          <h1>{service.title}</h1>
          <p>{service.heroDescription}</p>
          <Link
            to="/request-quote"
            state={{ itemName: service.title, itemType: "service" }}
            className="service-hero-btn"
          >
            Request Quote
          </Link>
        </div>
      </section>

      <section className="service-feature-section">
        <div className="service-feature-container">
          <div className="service-feature-text">
            <span className="service-feature-tag">
              {service.title.toUpperCase()}
            </span>
            <h2>{service.sectionTitle}</h2>
            <p>{service.sectionDescription}</p>

            <ul className="service-checklist">
              {service.checklist.map((item, index) => (
                <li key={index}>
                  <FiCheck className="check-icon" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="service-feature-image">
            <img src={service.heroImage} alt={service.title} />
          </div>
        </div>
      </section>

      {/* <ProductsCatalog category={service.productCategory} />

      <ProjectCTA /> */}

      <Footer />
    </>
  );
}
