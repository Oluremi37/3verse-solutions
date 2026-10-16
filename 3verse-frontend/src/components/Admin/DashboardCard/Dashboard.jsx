
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
  FiArrowUpRight,
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
            productsData.totalProducts ??
            productsData.products?.length ??
            0,

          services:
            servicesData.totalServices ??
            servicesData.services?.length ??
            0,

          portfolio:
            portfolioData.totalPortfolios ??
            portfolioData.portfolios?.length ??
            0,

          team:
            teamData.totalTeams ??
            teamData.teams?.length ??
            teamData.team?.length ??
            0,

          projects:
            projectsData.totalProjects ??
            projectsData.projects?.length ??
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
      color: "cyan",
    },
    {
      title: "Quotes",
      value: stats.quotes,
      icon: <FiFileText />,
      path: "/admin/quotes",
      color: "blue",
    },
    {
      title: "Schedules",
      value: stats.schedules,
      icon: <FiCalendar />,
      path: "/admin/schedules",
      color: "green",
    },
    {
      title: "Products",
      value: stats.products,
      icon: <FiPackage />,
      path: "/admin/products",
      color: "cyan",
    },
    {
      title: "Services",
      value: stats.services,
      icon: <FiBriefcase />,
      path: "/admin/services",
      color: "blue",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: <FiFolder />,
      path: "/admin/projects",
      color: "green",
    },
    {
      title: "Portfolio",
      value: stats.portfolio,
      icon: <FiImage />,
      path: "/admin/portfolio",
      color: "cyan",
    },
    {
      title: "Team",
      value: stats.team,
      icon: <FiUsers />,
      path: "/admin/team",
      color: "blue",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-welcome">
            Welcome back, Admin 👋
          </p>
        </div>
      </div>

      {loading ? (
        <div className="dashboard-loading" role="status">
          Loading dashboard statistics...
        </div>
      ) : (
        <div className="dashboard-cards">
          {cards.map((card) => (
            <Link
              to={card.path}
              className={`dashboard-card dashboard-card-${card.color}`}
              key={card.title}
              aria-label={`Open ${card.title}`}
            >
              <div className="dashboard-card-icon">
                {card.icon}
              </div>

              <div className="dashboard-card-content">
                <h2>{card.title}</h2>
                <span className="dashboard-card-value">
                  {card.value}
                </span>
              </div>

              <FiArrowUpRight
                className="dashboard-card-arrow"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
