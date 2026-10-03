import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FiMail,
  FiFileText,
  FiCalendar,
  FiPackage,
  FiBriefcase,
  FiFolder,
  FiImage,
  FiUsers,
} from "react-icons/fi";

import { getContacts } from "../../../services/contactService";
import { getQuotes } from "../../../services/quoteService";
import { getSchedules } from "../../../services/scheduleService";
import { getAdminProducts } from "../../../services/productService";
import { getAdminServices } from "../../../services/serviceService";
import { getPortfolios } from "../../../services/portfolioService";
import { getTeamAdminMembers } from "../../../services/teamService";
import { getProjects } from "../../../services/projectService";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    quotes: 0,
    schedules: 0,
    products: 0,
    services: 0,
    projects: 0,
    portfolio: 0,
    team: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        contactsData,
        quotesData,
        schedulesData,
        productsData,
        servicesData,
        portfolioData,
        teamData,
        projectsData,
      ] = await Promise.all([
        getContacts(),
        getQuotes(),
        getSchedules(),
        getAdminProducts(),
        getAdminServices(),
        getPortfolios(),
        getTeamAdminMembers(),
        getProjects(),
      ]);

      setStats({
        contacts: contactsData.contacts?.length || 0,

        quotes: quotesData.quotes?.length || 0,

        schedules: schedulesData.schedules?.length || 0,

        products:
          productsData.stats?.total || productsData.products?.length || 0,

        services: servicesData.services?.length || 0,

        portfolio: portfolioData.portfolios?.length || 0,

        team: teamData.teams?.length || teamData.team?.length || 0,

        projects:
          projectsData.totalProjects ?? projectsData.projects?.length ?? 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
   const fetchData = async () => {
     await loadDashboard();
   };

   fetchData();
 }, []);

  const cards = [
    {
      title: "Contacts",
      value: stats.contacts,
      icon: <FiMail />,
    },
    {
      title: "Quotes",
      value: stats.quotes,
      icon: <FiFileText />,
    },
    {
      title: "Schedules",
      value: stats.schedules,
      icon: <FiCalendar />,
    },
    {
      title: "Products",
      value: stats.products,
      icon: <FiPackage />,
    },
    {
      title: "Services",
      value: stats.services,
      icon: <FiBriefcase />,
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: <FiFolder />,
    },
    {
      title: "Portfolio",
      value: stats.portfolio,
      icon: <FiImage />,
    },
    {
      title: "Team",
      value: stats.team,
      icon: <FiUsers />,
    },
  ];

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <p className="dashboard-welcome">Welcome back, Admin 👋</p>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="dashboard-cards">
          {cards.map((card) => (
            <div className="dashboard-card" key={card.title}>
              <div className="dashboard-card-icon">{card.icon}</div>

              <div>
                <h2>{card.title}</h2>
                <span>{card.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
