import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./Testimonials.css";

const testimonials = [
  {
    text: `"3Verse successfully delivered the deployment of eighteen (18) video conferencing meeting rooms, including the Executive Boardroom, at the New IA Administration Building. From project planning through installation, testing, commissioning, and handover, the team maintained excellent coordination, met project milestones, and delivered a solution that met our operational requirements. Their professionalism, technical competence, and commitment to quality ensured a smooth implementation, and we are pleased with the outcome of the project."`,
    author: "NLNG",
    role: "New IA Administration Building Project Manager",
  },
  {
    text: `"Working with 3Verse on our video conferencing and network infrastructure projects has been a positive experience. The team demonstrated strong technical expertise, professionalism, and a commitment to delivering quality solutions. Their deployment of modern collaboration technologies has significantly improved the reliability and user experience of our meeting spaces. 3Verse's responsiveness, attention to detail, and post-deployment support have made them a trusted technology partner for our operations."`,
    author: "NLNG Operations",
    role: "Network Infrastructure & Video Conferencing",
  },
  {
    text: `"3Verse's ERP system has helped our management system to be faster and easier."`,
    author: "Travelbeta",
    role: "",
  },
  {
    text: `"It saves time and cost. Makes our advertisements easy to publish and has increased our sales ever since."`,
    author: "ARM Pensions",
    role: "",
  },
  {
    text: `"Despite the number of inputs daily, 3Verse's print management solution helps in managing print jobs easily."`,
    author: "Nigerian Breweries",
    role: "",
  },
  {
    text: `"3Verse's VoIP Solution is powered by their proprietary software OMNICS and it is very powerful and robust in every sense."`,
    author: "Lagoon Hospital / Hygeia",
    role: "",
  },
  {
    text: `"Loud and clear, making conversations between customers and companies feel like a near-reality audio output quality."`,
    author: "AELEX / Banwo & Ighodalo",
    role: "",
  },
  {
    text: `"3Verse's WPS solution helps in making conference meetings and presentations very easy in one click. Very awesome!"`,
    author: "PZ Cussons",
    role: "",
  },
  {
    text: `"3Verse successfully delivered 18 video conferencing rooms on schedule, demonstrating professionalism, technical expertise, and quality execution."`,
    author: "NLNG",
    role: "",
  },
];

const Testimonial = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="testimonial">
      <div className="testimonial-container">
        <h2>
          Trusted by Businesses
          <br />
          That Move Technology Forward
        </h2>

        <div className="testimonial-embla" ref={emblaRef}>
          <div className="testimonial-track">
            {testimonials.map((item, index) => (
              <div className="testimonial-slide" key={index}>
                <div className="testimonial-card">
                  <p>{item.text}</p>

                  <h4>{item.author}</h4>

                  {item.role && <span>{item.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${
                selectedIndex === index ? "active" : ""
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      <div className="curve"></div>
    </section>
  );
};

export default Testimonial;
