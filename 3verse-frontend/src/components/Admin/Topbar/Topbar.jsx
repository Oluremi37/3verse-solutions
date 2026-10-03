import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiSearch,
  FiMail,
  FiFileText,
  FiCalendar,
} from "react-icons/fi";

import { getContacts } from "../../../services/contactService";
import { getQuotes } from "../../../services/quoteService";
import { getSchedules } from "../../../services/scheduleService";

import "./Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    contacts: 0,
    quotes: 0,
    schedules: 0,
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);

      const [contactsData, quotesData, schedulesData] = await Promise.all([
        getContacts(),
        getQuotes(),
        getSchedules(),
      ]);

      const unreadContacts = (contactsData.contacts || []).filter(
        (contact) => !contact.isRead,
      ).length;

      const pendingQuotes = (quotesData.quotes || []).filter(
        (quote) => quote.status === "Pending",
      ).length;

      const pendingSchedules = (schedulesData.schedules || []).filter(
        (schedule) => schedule.status === "Pending",
      ).length;

      setNotifications({
        contacts: unreadContacts,
        quotes: pendingQuotes,
        schedules: pendingSchedules,
      });
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    // call fetchNotifications asynchronously to avoid synchronous setState inside effect
    const load = async () => {
      await fetchNotifications();
    };

    load();

    // Refresh notification count every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, []);

  const totalNotifications =
    notifications.contacts + notifications.quotes + notifications.schedules;

  return (
    <header className="topbar">
      <div className="topbar-search">
        <FiSearch />

        <input type="text" placeholder="Search..." />
      </div>

      <div className="topbar-right">
        {/* Notifications */}
        <div className="notification-wrapper">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notifications"
          >
            <FiBell />

            {totalNotifications > 0 && (
              <span className="notification-badge">
                {totalNotifications > 99 ? "99+" : totalNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <div>
                  <h3>Notifications</h3>
                  <p>
                    {totalNotifications === 0
                      ? "You're all caught up."
                      : `${totalNotifications} item${
                          totalNotifications > 1 ? "s" : ""
                        } need your attention.`}
                  </p>
                </div>
              </div>

              {loadingNotifications ? (
                <div className="notification-empty">
                  Loading notifications...
                </div>
              ) : totalNotifications === 0 ? (
                <div className="notification-empty">No new notifications</div>
              ) : (
                <div className="notification-list">
                  {/* Contacts */}
                  {notifications.contacts > 0 && (
                    <button
                      className="notification-item"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/admin/contacts");
                      }}
                    >
                      <div className="notification-icon">
                        <FiMail />
                      </div>

                      <div className="notification-content">
                        <strong>
                          {notifications.contacts} unread contact
                          {notifications.contacts > 1 ? "s" : ""}
                        </strong>

                        <span>
                          New contact message
                          {notifications.contacts > 1 ? "s" : ""}
                          received.
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Quotes */}
                  {notifications.quotes > 0 && (
                    <button
                      className="notification-item"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/admin/quotes");
                      }}
                    >
                      <div className="notification-icon">
                        <FiFileText />
                      </div>

                      <div className="notification-content">
                        <strong>
                          {notifications.quotes} pending quote
                          {notifications.quotes > 1 ? "s" : ""}
                        </strong>

                        <span>
                          Quote request
                          {notifications.quotes > 1 ? "s" : ""}
                          waiting for review.
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Schedules */}
                  {notifications.schedules > 0 && (
                    <button
                      className="notification-item"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/admin/schedules");
                      }}
                    >
                      <div className="notification-icon">
                        <FiCalendar />
                      </div>

                      <div className="notification-content">
                        <strong>
                          {notifications.schedules} pending consultation
                          {notifications.schedules > 1 ? "s" : ""}
                        </strong>

                        <span>
                          Consultation booking
                          {notifications.schedules > 1 ? "s" : ""}
                          waiting for confirmation.
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              )}

              <button
                className="notification-footer"
                onClick={() => {
                  setShowNotifications(false);
                  fetchNotifications();
                }}
              >
                Refresh notifications
              </button>
            </div>
          )}
        </div>

        {/* Admin profile */}
        <div className="admin-profile">
          <div className="admin-avatar">A</div>

          <div>
            <h4>Admin</h4>
            <p>Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
