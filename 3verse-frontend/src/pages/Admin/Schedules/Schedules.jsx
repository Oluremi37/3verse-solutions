
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import {
  getSchedules,
  updateSchedule,
  deleteSchedule,
} from "../../../services/scheduleService";

import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";

import "./Schedules.css";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [completeSchedule, setCompleteSchedule] = useState(null);

  const loadSchedules = async () => {
    try {
      setLoading(true);

      const data = await getSchedules();
      setSchedules(data.schedules || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load schedules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSchedules();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const filteredSchedules = schedules.filter((schedule) => {
    const keyword = search.toLowerCase();

    return (
      schedule.fullName?.toLowerCase().includes(keyword) ||
      schedule.email?.toLowerCase().includes(keyword) ||
      schedule.consultationType?.toLowerCase().includes(keyword)
    );
  });

  const stats = {
    total: schedules.length,
    pending: schedules.filter((s) => s.status === "Pending").length,
    completed: schedules.filter((s) => s.status === "Completed").length,
  };

  const columns = [
    {
      key: "fullName",
      label: "Customer",
    },
    {
      key: "consultationType",
      label: "Consultation",
    },
    {
      key: "contactDetail",
      label: "Location / Phone",
      render: (schedule) =>
        schedule.consultationType === "In-Person Meeting"
          ? schedule.location || "N/A"
          : schedule.phoneNumber || "N/A",
    },
    {
      key: "preferredDate",
      label: "Date",
      render: (schedule) =>
        schedule.preferredDate
          ? new Date(schedule.preferredDate).toLocaleString()
          : "N/A",
    },
    {
      key: "status",
      label: "Status",
      render: (schedule) => (
        <span className={`status ${(schedule.status || "").toLowerCase()}`}>
          {schedule.status || "Unknown"}
        </span>
      ),
    },
  ];

  const handleComplete = async () => {
    if (!completeSchedule) return;

    try {
      await updateSchedule(completeSchedule._id, {
        status: "Completed",
      });

      toast.success("Schedule completed successfully.");

      setCompleteSchedule(null);
      await loadSchedules();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update schedule.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteSchedule(deleteId);

      toast.success("Deleted successfully.");
      setDeleteId(null);

      if (selectedSchedule?._id === deleteId) {
        setSelectedSchedule(null);
      }

      await loadSchedules();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete schedule.");
    }
  };

  return (
    <div className="schedule-page">
      <PageHeader
        title="Schedule"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search schedule..."
      />

      <StatsCards
        cards={[
          {
            title: "Total",
            value: stats.total,
            icon: <FiCalendar />,
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: <FiClock />,
          },
          {
            title: "Completed",
            value: stats.completed,
            icon: <FiCheckCircle />,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filteredSchedules}
        loading={loading}
        emptyMessage="No schedules found."
        renderActions={(schedule) => (
          <div className="actions">
            <button onClick={() => setSelectedSchedule(schedule)}>
              View
            </button>

            {schedule.status !== "Completed" && (
              <button onClick={() => setCompleteSchedule(schedule)}>
                Complete
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => setDeleteId(schedule._id)}
            >
              Delete
            </button>
          </div>
        )}
      />

      {/* Complete Schedule Confirmation */}
      <ConfirmModal
        isOpen={!!completeSchedule}
        title="Complete Schedule"
        message="Are you sure you want to mark this consultation as completed?"
        confirmText="Complete"
        cancelText="Cancel"
        onConfirm={handleComplete}
        onCancel={() => setCompleteSchedule(null)}
      />

      {/* Delete Schedule Confirmation */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Schedule"
        message="Delete this consultation request?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Consultation Details Modal */}
      {selectedSchedule && (
        <div
          className="schedule-modal-overlay"
          onClick={() => setSelectedSchedule(null)}
        >
          <div
            className="schedule-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="schedule-modal-header">
              <h2>Consultation Details</h2>

              <button
                className="schedule-modal-close"
                onClick={() => setSelectedSchedule(null)}
                aria-label="Close consultation details"
              >
                ✕
              </button>
            </div>

            <div className="schedule-grid">
              <div>
                <label>Customer</label>
                <p>{selectedSchedule.fullName || "N/A"}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{selectedSchedule.email || "N/A"}</p>
              </div>

              <div>
                <label>Consultation Type</label>
                <p>{selectedSchedule.consultationType || "N/A"}</p>
              </div>

              {selectedSchedule.consultationType ===
                "In-Person Meeting" && (
                <div>
                  <label>Office Location</label>
                  <p>{selectedSchedule.location || "N/A"}</p>
                </div>
              )}

              {selectedSchedule.consultationType === "Phone Call" && (
                <div>
                  <label>Phone Number</label>
                  <p>{selectedSchedule.phoneNumber || "N/A"}</p>
                </div>
              )}

              <div>
                <label>Preferred Date</label>
                <p>
                  {selectedSchedule.preferredDate
                    ? new Date(
                        selectedSchedule.preferredDate,
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <label>Status</label>
                <span
                  className={`status ${(selectedSchedule.status || "").toLowerCase()}`}
                >
                  {selectedSchedule.status || "Unknown"}
                </span>
              </div>

              <div>
                <label>Created At</label>
                <p>
                  {selectedSchedule.createdAt
                    ? new Date(
                        selectedSchedule.createdAt,
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
