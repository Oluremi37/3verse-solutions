import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiFileText, FiClock, FiEye, FiCheckCircle } from "react-icons/fi";

import {
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
} from "../../../services/quoteService";

import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";

import "./Quotes.css";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    viewed: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const data = await getQuotes();
      setQuotes(data.quotes || []);
      setStats(
        data.stats || {
          total: 0,
          pending: 0,
          viewed: 0,
          completed: 0,
        },
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      loadQuotes();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleViewQuote = async (id) => {
    try {
      const data = await getQuote(id);
      setSelectedQuote(data.quote);
      await loadQuotes();
    } catch (err) {
      console.error(err);
      toast.error("Failed to load quote.");
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateQuote(id, {
        status: "Completed",
      });
      toast.success("Quote marked as completed.");
      if (selectedQuote && selectedQuote._id === id) {
        const updated = await getQuote(id);
        setSelectedQuote(updated.quote);
      }
      await loadQuotes();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quote.");
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const keyword = search.toLowerCase();
    return (
      quote.fullName.toLowerCase().includes(keyword) ||
      quote.email.toLowerCase().includes(keyword) ||
      quote.product.toLowerCase().includes(keyword)
    );
  });

  const columns = [
    {
      key: "fullName",
      label: "Customer",
    },
    {
      key: "companyName",
      label: "Company",
      render: (quote) => quote.companyName || "N/A",
    },
    {
      key: "product",
      label: "Product",
    },
    {
      key: "quantity",
      label: "Qty",
    },
    {
      key: "status",
      label: "Status",
      render: (quote) => (
        <span className={`status ${quote.status.toLowerCase()}`}>
          {quote.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (quote) => new Date(quote.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="quotes-page">
      <PageHeader
        title="Quote Requests"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search quotes..."
      />

      <StatsCards
        cards={[
          {
            title: "Total Quotes",
            value: stats.total || 0,
            icon: <FiFileText />,
          },
          {
            title: "Pending",
            value: stats.pending || 0,
            icon: <FiClock />,
          },
          {
            title: "Viewed",
            value: stats.viewed || 0,
            icon: <FiEye />,
          },
          {
            title: "Completed",
            value: stats.completed || 0,
            icon: <FiCheckCircle />,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filteredQuotes}
        loading={loading}
        emptyMessage="No quote requests found."
        renderActions={(quote) => (
          <div className="actions">
            <button onClick={() => handleViewQuote(quote._id)}>View</button>

            {quote.status !== "Completed" && (
              <button onClick={() => handleComplete(quote._id)}>
                Complete
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => setDeleteId(quote._id)}
            >
              Delete
            </button>
          </div>
        )}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Quote"
        message="Delete this quote permanently?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          try {
            await deleteQuote(deleteId);
            toast.success("Quote deleted successfully.");
            setDeleteId(null);
            await loadQuotes();
          } catch (err) {
            console.error(err);
            toast.error("Failed to delete quote.");
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      {selectedQuote && (
        <div className="quote-modal">
          <div className="quote-modal-content">
            <div className="quote-modal-header">
              <h2>Quote Details</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedQuote(null)}
              >
                ✕
              </button>
            </div>

            <div className="quote-grid">
              <div>
                <label>Full Name</label>
                <p>{selectedQuote.fullName}</p>
              </div>

              <div>
                <label>Company</label>
                <p>{selectedQuote.companyName || "N/A"}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{selectedQuote.email}</p>
              </div>

              <div>
                <label>Phone</label>
                <p>{selectedQuote.phone}</p>
              </div>

              <div>
                <label>Product</label>
                <p>{selectedQuote.product}</p>
              </div>

              <div>
                <label>Quantity</label>
                <p>{selectedQuote.quantity}</p>
              </div>

              <div className="full-width">
                <label>Project Details</label>
                <p>{selectedQuote.details || "No additional details."}</p>
              </div>

              <div>
                <label>Status</label>
                <span
                  className={`status ${selectedQuote.status.toLowerCase()}`}
                >
                  {selectedQuote.status}
                </span>
              </div>

              <div>
                <label>Submitted</label>
                <p>{new Date(selectedQuote.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
