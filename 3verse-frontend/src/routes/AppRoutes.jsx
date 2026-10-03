import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import AdminLayout from "../layouts/AdminLayout/AdminLayout.jsx";
import Login from "../pages/Admin/Login/Login";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Contacts from "../pages/Admin/Contacts/Contacts";
import Quotes from "../pages/Admin/Quotes/Quotes";
import Schedules from "../pages/Admin/Schedules/Schedules";
import Products from "../pages/Admin/Products/Products";
import Services from "../pages/Admin/Services/Services";
import Projects from "../pages/Admin/Projects/Projects";
import Portfolio from "../pages/Admin/Portfolio/Portfolio";
import Team from "../pages/Admin/Team/Team";
import Settings from "../pages/Admin/Settings/Settings";

import Home from "../pages/Home.jsx";
import AboutPage from "../pages/AboutPage";
import OurStoryPage from "../pages/OurStoryPage";
import OurMissionPage from "../pages/OurMissionPage";
import ProductsPage from "../pages/ProductsPage";
import TeamPage from "../pages/TeamPage";
import PortfolioPage from "../pages/PortfolioPage";
import PortfolioDetails from "../pages/PortfolioDetails";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ServiceDetail from "../components/ServiceDetail/ServiceDetail";
import RequestQuote from "../components/RequestQuote/RequestQuote";
import ContactPage from "../pages/ContactPage.jsx";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/story" element={<OurStoryPage />} />
      <Route path="/about/mission" element={<OurMissionPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/:id" element={<PortfolioDetails />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/request-quote" element={<RequestQuote />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/admin"
        element={
          isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="team" element={<Team />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Login */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/admin" replace /> : <Login />}
      />
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/admin" : "/login"} replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
