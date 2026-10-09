import { useEffect, useState } from "react";
import { getServices } from "../../services/serviceService";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
       setServices(Array.isArray(data) ? data : data?.services || []);
      } catch (err) {
        console.error("Service Error:", err);
      }
    };

    loadServices();
  }, []);

  return (
    <section className="services" id="services">
      <div className="services-container">
        <ScrollReveal>
          <div className="services-header">
            <span className="services-tag">Our Services</span>
            <h2>Technology solutions that connect people and businesses</h2>
            <p>
              From unified communications to digital signage and systems
              integration, we design and deliver solutions that help
              organizations work better.
            </p>
          </div>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service._id || service.slug}>
              <div className="service-icon-box">
                {service.icon && (
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="service-icon"
                  />
                )}
              </div>

              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>

              <Link to={`/services/${service.slug}`} className="learn-more">
                <span>Learn more</span>
                <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
