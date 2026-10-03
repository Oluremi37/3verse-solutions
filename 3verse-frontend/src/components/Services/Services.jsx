import { useEffect, useMemo, useState } from "react";
import { getServices } from "../../services/serviceService";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import "./Services.css";


import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const Services = () => {
const autoScroll = useMemo(
  () =>
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      speed: 0.8,
    }),
  [],
);
  const [services, setServices] = useState([]);

const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: true,
  },
  [autoScroll],
);
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const pauseAutoScroll = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll) autoScroll.stop();
  };

  const resumeAutoScroll = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll) autoScroll.play();
  };
  
useEffect(() => {
  const loadServices = async () => {
    try {
      const data = await getServices();

      console.log("API Response:", data);

      setServices(data.services || []);
    } catch (err) {
      console.error("Service Error:", err);
    }
  };

  loadServices();
}, []);
  
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();

    const auto = emblaApi.plugins()?.autoScroll;

    if (auto) {
      auto.play();
    }
  }, [services, emblaApi]);
  

  return (
    <section className="services" id="services">
      <div className="services-container">
        <ScrollReveal>
          <div className="services-header">
            <h2>Our Services</h2>

            <p>
              3Verse is a pioneering technology firm dedicated to delivering
              innovative solutions that enhance business efficiency and drive
              growth. Our expertise spans various sectors, providing tailored
              services that meet the unique needs of our clients.
            </p>
          </div>
        </ScrollReveal>

        <div
          className="services-slider-wrapper"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          <div className="services-slider-embla" ref={emblaRef}>
            <div className="services-slider-container">
              {services.map((service, index) => (
                <div className="service-slide" key={index}>
                  <div className="service-card">
                    <div className="service-icon-box">
                      {service.icon && (
                        <img
                          src={service.icon}
                          alt={service.title}
                          className={`service-icon ${
                            service.title === "Software Development"
                              ? "software-development-icon"
                              : ""
                          }`}
                        />
                      )}
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.shortDescription}</p>

                    <Link
                      to={`/services/${service.slug}`}
                      className="learn-more"
                    >
                      <span>Learn more</span>
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="services-nav">
            <button onClick={scrollPrev} aria-label="Previous service">
              <FaChevronLeft />
            </button>
            <button onClick={scrollNext} aria-label="Next service">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
