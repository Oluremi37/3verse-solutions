import {
  FiGrid,
  FiMail,
  FiFileText,
  FiCalendar,
  FiPackage,
  FiBriefcase,
  FiFolder,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiImage,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import "./Sidebar.css";

const menuItems = [
  { name: "Dashboard", icon: <FiGrid />, path: "/admin" },
  { name: "Contacts", icon: <FiMail />, path: "/admin/contacts" },
  { name: "Quotes", icon: <FiFileText />, path: "/admin/quotes" },
  { name: "Schedules", icon: <FiCalendar />, path: "/admin/schedules" },
  { name: "Products", icon: <FiPackage />, path: "/admin/products" },
  { name: "Services", icon: <FiBriefcase />, path: "/admin/services" },
  { name: "Projects", icon: <FiFolder />, path: "/admin/projects" },
  { name: "Portfolio", icon: <FiImage />, path: "/admin/portfolio" },
  { name: "Team", icon: <FiUsers />, path: "/admin/team" },
  { name: "Settings", icon: <FiSettings />, path: "/admin/settings" },
];

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>3Verse</h2>
        <span>Admin Panel</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}
