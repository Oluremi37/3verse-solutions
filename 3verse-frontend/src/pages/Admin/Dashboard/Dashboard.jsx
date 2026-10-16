
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
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

        if (!isMounted) return;

        setStats({
          contacts: contactsData.contacts?.length ?? 0,

          quotes: quotesData.quotes?.length ?? 0,

          schedules: schedulesData.schedules?.length ?? 0,

          products:
            productsData.stats?.total ??
            productsData.products?.length ??
            0,

          services: servicesData.services?.length ?? 0,

          projects:
            projectsData.totalProjects ??
            projectsData.projects?.length ??
            0,

          portfolio:
            portfolioData.totalPortfolios ??
            portfolioData.portfolios?.length ??
            0,

          team:
            teamData.teams?.length ??
            teamData.team?.length ??
            0,
        });
      } catch (error) {
        console.error("Dashboard error:", error);

        if (isMounted) {
          toast.error("Failed to load dashboard statistics.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = [
    {
      title: "Contacts",
      value: stats.contacts,
      icon: <FiMail />,
      path: "/admin/contacts",
    },
    {
      title: "Quotes",
      value: stats.quotes,
      icon: <FiFileText />,
      path: "/admin/quotes",
    },
    {
      title: "Schedules",
      value: stats.schedules,
      icon: <FiCalendar />,
      path: "/admin/schedules",
    },
    {
      title: "Products",
      value: stats.products,
      icon: <FiPackage />,
      path: "/admin/products",
    },
    {
      title: "Services",
      value: stats.services,
      icon: <FiBriefcase />,
      path: "/admin/services",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: <FiFolder />,
      path: "/admin/projects",
    },
    {
      title: "Portfolio",
      value: stats.portfolio,
      icon: <FiImage />,
      path: "/admin/portfolio",
    },
    {
      title: "Team",
      value: stats.team,
      icon: <FiUsers />,
      path: "/admin/team",
    },
  ];

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <p className="dashboard-welcome">
        Welcome back, Admin 👋
      </p>

      {loading ? (
        <p role="status">Loading dashboard...</p>
      ) : (
        <div className="dashboard-cards">
          {cards.map((card) => (
            <Link
              to={card.path}
              className="dashboard-card"
              key={card.title}
              aria-label={`Open ${card.title}`}
            >
              <div className="dashboard-card-icon">
                {card.icon}
              </div>

              <div className="dashboard-card-content">
                <h2>{card.title}</h2>
                <span>{card.value}</span>
              </div>

              <span className="dashboard-card-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
