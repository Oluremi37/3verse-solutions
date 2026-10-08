import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import About from "../components/About/About.jsx";
import Partners from "../components/Partners/Partners.jsx";
import Services from "../components/Services/Services.jsx";
import Testimonials from "../components/Testimonials/Testimonials.jsx";
import Team from "../components/Teams/Team.jsx";
import Portfolio from "../components/Portfolio/Portfolio.jsx";
import Products from "../components/Products/Products.jsx";
import ContactUs from "../components/ContactUs/ContactUs.jsx";
import ProjectCTA from "../components/ProjectCTA/ProjectCTA.jsx";
import Footer from "../components/Footer/Footer.jsx";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Partners />
      <Services />
      <Testimonials />
      <Team />
      <Portfolio />
      <Products />
      <ContactUs />
      
      <ProjectCTA />
      <Footer />
    </>
  );
};

export default Home;
