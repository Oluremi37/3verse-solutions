  import { useCallback, useEffect, useState } from "react";
  import toast from "react-hot-toast";

  import {
    getPortfolios,
    deletePortfolio,
  } from "../../../services/portfolioService";
  import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
  import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
  import DataTable from "../../../components/Admin/DataTable/DataTable";
  import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";
  import PortfolioModal from "../../../components/Admin/PortfolioModal/PortfolioModal";

  import "./Portfolio.css";

  export default function Portfolio() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [editingPortfolio, setEditingPortfolio] = useState(null);

    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    const [deleteId, setDeleteId] = useState(null);

    const loadPortfolios = useCallback(async () => {
      try {
        setLoading(true);

        const data = await getPortfolios();
       

       

        setPortfolios(data.portfolios || []);

        setPortfolios(data.portfolios || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      const initialize = async () => {
        await loadPortfolios();
      };

      initialize();
    }, [loadPortfolios]);

    const filteredPortfolios = portfolios.filter((project) => {
      const keyword = search.toLowerCase();

      return (
        project.title.toLowerCase().includes(keyword) ||
        project.industry.toLowerCase().includes(keyword)
      );
    });

    const stats = {
      total: portfolios.length,
      featured: portfolios.filter((p) => p.isFeatured).length,
      published: portfolios.filter((p) => p.isPublished).length,
    };

    const columns = [
      {
        key: "image",
        label: "Cover",
        render: (project) => (
          <img
            src={project.images?.[0]}
            alt={project.title}
            className="portfolio-cover"
          />
        ),
      },
      {
        key: "title",
        label: "Project",
      },
      {
        key: "industry",
        label: "Industry",
      },
      {
        key: "displayOrder",
        label: "Order",
      },
      {
        key: "isFeatured",
        label: "Featured",
        render: (project) => (
          <span className={project.isFeatured ? "active" : "draft"}>
            {project.isFeatured ? "Yes" : "No"}
          </span>
        ),
      },
      {
        key: "isPublished",
        label: "Status",
        render: (project) => (
          <span className={project.isPublished ? "active" : "draft"}>
            {project.isPublished ? "Published" : "Draft"}
          </span>
        ),
      },
    ];

    return (
      <div className="portfolio-page">
        <PageHeader
          title="Portfolio"
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search portfolio..."
          buttonText="Add Portfolio"
          onButtonClick={() => {
            setEditingPortfolio(null);
            setOpenModal(true);
          }}
        />

        <StatsCards
          cards={[
            {
              title: "Projects",
              value: stats.total,
            },
            {
              title: "Featured",
              value: stats.featured,
            },
            {
              title: "Published",
              value: stats.published,
            },
          ]}
        />

        <DataTable
          columns={columns}
          data={filteredPortfolios}
          loading={loading}
          emptyMessage="No portfolio found."
          renderActions={(project) => (
            <div className="actions">
              <button onClick={() => setSelectedPortfolio(project)}>View</button>

              <button
                onClick={() => {
                  setEditingPortfolio(project);
                  setOpenModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => setDeleteId(project._id)}
              >
                Delete
              </button>
            </div>
          )}
        />

        {/* We'll connect these next */}
        <PortfolioModal
          isOpen={openModal}
          portfolio={editingPortfolio}
          onClose={() => {
            setOpenModal(false);
            setEditingPortfolio(null);
          }}
          onSuccess={loadPortfolios}
        />

        <ConfirmModal
          isOpen={!!deleteId}
          title="Delete Portfolio"
          message="Delete this project permanently?"
          confirmText="Delete"
          cancelText="Cancel"
          danger
          onConfirm={async () => {
            try {
              await deletePortfolio(deleteId);

              toast.success("Portfolio deleted.");

              setDeleteId(null);

              loadPortfolios();
            } catch {
              toast.error("Delete failed.");
            }
          }}
          onCancel={() => setDeleteId(null)}
        />

        {selectedPortfolio && (
          <div className="view-team-overlay">
            <div className="view-team-modal portfolio-view-modal">
              <div className="view-team-header">
                <h2>Portfolio Details</h2>

                <button
                  className="close-btn"
                  onClick={() => setSelectedPortfolio(null)}
                >
                  ✕
                </button>
              </div>

              <div className="view-team-grid">
                <div className="full-width">
                  <div className="portfolio-view-images">
                    {selectedPortfolio.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedPortfolio.title}-${index}`}
                        className="portfolio-view-image"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label>Project Title</label>
                  <p>{selectedPortfolio.title}</p>
                </div>

                <div>
                  <label>Industry</label>
                  <p>{selectedPortfolio.industry}</p>
                </div>

                <div className="full-width">
                  <label>Description</label>
                  <p>{selectedPortfolio.description}</p>
                </div>

                <div className="full-width">
                  <label>Result</label>
                  <p>{selectedPortfolio.result}</p>
                </div>

                <div>
                  <label>Display Order</label>
                  <p>{selectedPortfolio.displayOrder}</p>
                </div>

                <div>
                  <label>Featured</label>
                  <span
                    className={`status ${
                      selectedPortfolio.isFeatured ? "active" : "draft"
                    }`}
                  >
                    {selectedPortfolio.isFeatured ? "Yes" : "No"}
                  </span>
                </div>

                <div className="full-width">
                  <label>Status</label>

                  <span
                    className={`status ${
                      selectedPortfolio.isPublished ? "active" : "draft"
                    }`}
                  >
                    {selectedPortfolio.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
      
      
      
  }
