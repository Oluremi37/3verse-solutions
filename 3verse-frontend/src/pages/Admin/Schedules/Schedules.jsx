import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
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
      toast.error("Failed to update schedule.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadSchedules, 0);

    return () => clearTimeout(timer);
  }, []);

  const filteredSchedules = schedules.filter((schedule) => {
    const keyword = search.toLowerCase();

    return (
      schedule.fullName.toLowerCase().includes(keyword) ||
      schedule.email.toLowerCase().includes(keyword) ||
      schedule.consultationType.toLowerCase().includes(keyword)
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
      render: (schedule) => new Date(schedule.preferredDate).toLocaleString(),
    },
    {
      key: "status",
      label: "Status",
      render: (schedule) => (
        <span className={`status ${schedule.status.toLowerCase()}`}>
          {schedule.status}
        </span>
      ),
    },
  ];

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
            <button onClick={() => setSelectedSchedule(schedule)}>View</button>

            <button onClick={() => setCompleteSchedule(schedule)}>
              Complete
            </button>

            <ConfirmModal
              isOpen={!!completeSchedule}
              title="Complete Schedule"
              message="Are you sure you want to mark this consultation as completed?"
              confirmText="Complete"
              cancelText="Cancel"
              onConfirm={async () => {
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
              }}
              onCancel={() => setCompleteSchedule(null)}
            />

            <button
              className="delete-btn"
              onClick={() => setDeleteId(schedule._id)}
            >
              Delete
            </button>
          </div>
        )}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Schedule"
        message="Delete this consultation request?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          try {
            await deleteSchedule(deleteId);

            toast.success("Deleted successfully.");

            setDeleteId(null);

            await loadSchedules();
          } catch (err) {
            console.error(err);

            toast.error("Failed to delete schedule.");
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      {selectedSchedule && (
        <div className="modal-overlay">
          <div className="schedule-modal">
            <div className="schedule-modal-header">
              <h2>Consultation Details</h2>

              <button
                className="close-btn"
                onClick={() => setSelectedSchedule(null)}
              >
                ✕
              </button>
            </div>

            <div className="schedule-grid">
              <div>
                <label>Customer</label>
                <p>{selectedSchedule.fullName}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{selectedSchedule.email}</p>
              </div>

              <div>
                <label>Consultation Type</label>
                <p>{selectedSchedule.consultationType}</p>
              </div>

              {selectedSchedule.consultationType === "In-Person Meeting" && (
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
                  {new Date(selectedSchedule.preferredDate).toLocaleString()}
                </p>
              </div>

              <div>
                <label>Status</label>

                <span
                  className={`status ${selectedSchedule.status.toLowerCase()}`}
                >
                  {selectedSchedule.status}
                </span>
              </div>

              <div>
                <label>Created At</label>
                <p>{new Date(selectedSchedule.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
