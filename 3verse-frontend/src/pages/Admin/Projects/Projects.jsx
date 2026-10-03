import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiFolder, FiStar, FiCheckCircle } from "react-icons/fi";

import { getProjects, deleteProject } from "../../../services/projectService";

import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";
import ProjectModal from "../../../components/Admin/ProjectModal/ProjectModal";

import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // call loadProjects asynchronously to avoid setting state synchronously inside effect
    (async () => {
      await loadProjects();
    })();
  }, [loadProjects]);

  const filteredProjects = projects.filter((project) => {
    const keyword = search.toLowerCase();

    return (
      project.title?.toLowerCase().includes(keyword) ||
      project.category?.toLowerCase().includes(keyword) ||
      project.client?.toLowerCase().includes(keyword)
    );
  });

  const stats = {
    total: projects.length,
    featured: projects.filter((p) => p.isFeatured).length,
    published: projects.filter((p) => p.isPublished).length,
  };

  const columns = [
    {
      key: "coverImage",
      label: "Cover",
      render: (project) => (
        <img
          src={project.coverImage || "/placeholder.png"}
          alt={project.title}
          className="project-cover"
        />
      ),
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "client",
      label: "Client",
      render: (project) => project.client || "N/A",
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
    <div className="projects-page">
      <PageHeader
        title="Projects"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search projects..."
        buttonText="Add Project"
        onButtonClick={() => {
          setEditingProject(null);
          setOpenModal(true);
        }}
      />

      <StatsCards
        cards={[
          {
            title: "Total Projects",
            value: stats.total,
            icon: <FiFolder />,
          },
          {
            title: "Featured",
            value: stats.featured,
            icon: <FiStar />,
          },
          {
            title: "Published",
            value: stats.published,
            icon: <FiCheckCircle />,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filteredProjects}
        loading={loading}
        emptyMessage="No projects found."
        renderActions={(project) => (
          <div className="actions">
            <button onClick={() => setSelectedProject(project)}>View</button>

            <button
              onClick={() => {
                setEditingProject(project);
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

      <ProjectModal
        key={editingProject?._id || "new"}
        isOpen={openModal}
        project={editingProject}
        onClose={() => {
          setOpenModal(false);
          setEditingProject(null);
        }}
        onSuccess={loadProjects}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Project"
        message="Delete this project permanently?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          try {
            await deleteProject(deleteId);

            toast.success("Project deleted successfully.");

            setDeleteId(null);
            loadProjects();
          } catch (err) {
            console.error(err);
            toast.error("Failed to delete project.");
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      {selectedProject && !openModal && (
        <div className="view-team-overlay">
          <div className="view-team-modal project-view-modal">
            <div className="view-project-header">
              <h2>Project Details</h2>

              <button
                className="close-btn"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </div>

            <div className="view-project-grid">
              <div className="full-width">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="view-cover-image"
                />
              </div>

              <div>
                <label>Title</label>
                <p>{selectedProject.title}</p>
              </div>

              <div>
                <label>Category</label>
                <p>{selectedProject.category}</p>
              </div>

              <div>
                <label>Client</label>
                <p>{selectedProject.client || "N/A"}</p>
              </div>

              <div>
                <label>Completion Date</label>
                <p>
                  {selectedProject.completionDate
                    ? new Date(
                        selectedProject.completionDate,
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <label>Live URL</label>
                <p>{selectedProject.liveUrl || "N/A"}</p>
              </div>

              <div>
                <label>GitHub URL</label>
                <p>{selectedProject.githubUrl || "N/A"}</p>
              </div>

              <div className="full-width">
                <label>Technologies</label>
                <p>
                  {(selectedProject.technologies || []).join(", ") || "N/A"}
                </p>
              </div>

              <div className="full-width">
                <label>Short Description</label>
                <p>{selectedProject.shortDescription}</p>
              </div>

              <div className="full-width">
                <label>Description</label>
                <p>{selectedProject.description}</p>
              </div>

              <div className="full-width">
                <label>Gallery</label>

                {selectedProject.gallery?.length ? (
                  <div className="gallery-grid">
                    {selectedProject.gallery.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="gallery-image"
                      />
                    ))}
                  </div>
                ) : (
                  <p>No gallery images.</p>
                )}
              </div>

              <div>
                <label>Featured</label>
                <span
                  className={`status ${
                    selectedProject.isFeatured ? "active" : "draft"
                  }`}
                >
                  {selectedProject.isFeatured ? "Yes" : "No"}
                </span>
              </div>

              <div>
                <label>Status</label>
                <span
                  className={`status ${
                    selectedProject.isPublished ? "active" : "draft"
                  }`}
                >
                  {selectedProject.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
