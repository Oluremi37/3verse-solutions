import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiBriefcase, FiCheckCircle, FiXCircle } from "react-icons/fi";

import { getServices, deleteService } from "../../../services/serviceService";

import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";
import ServiceModal from "../../../components/Admin/ServiceModal/ServiceModal";

import "./Services.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openServiceModal, setOpenServiceModal] = useState(false);

  const [editingService, setEditingService] = useState(null);

  const [selectedService, setSelectedService] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const loadServices = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getServices();

      setServices(data.services || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  }, []);

   useEffect(() => {
     Promise.resolve().then(loadServices);
   }, [loadServices]);
  const filteredServices = services.filter((service) => {
    const keyword = search.toLowerCase();

    return (
      service.title.toLowerCase().includes(keyword) ||
      service.slug.toLowerCase().includes(keyword)
    );
  });

  const stats = {
    total: services.length,
    published: services.filter((s) => s.isPublished).length,
    draft: services.filter((s) => !s.isPublished).length,
  };

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "isPublished",
      label: "Status",
      render: (service) => (
        <span className={`status ${service.isPublished ? "active" : "draft"}`}>
          {service.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (service) => new Date(service.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="services-page">
      <PageHeader
        title="Services"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search services..."
        buttonText="Add Service"
        onButtonClick={() => {
          setEditingService(null);
          setOpenServiceModal(true);
        }}
      />

      <StatsCards
        cards={[
          {
            title: "Total",
            value: stats.total,
            icon: <FiBriefcase />,
          },
          {
            title: "Published",
            value: stats.published,
            icon: <FiCheckCircle />,
          },
          {
            title: "Draft",
            value: stats.draft,
            icon: <FiXCircle />,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filteredServices}
        loading={loading}
        emptyMessage="No services found."
        renderActions={(service) => (
          <div className="actions">
            <button
              onClick={() => {
                setSelectedService(service);
              }}
            >
              View
            </button>

            <button
              onClick={() => {
                setEditingService(service);
                setOpenServiceModal(true);
              }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => setDeleteId(service._id)}
            >
              Delete
            </button>
          </div>
        )}
      />

      <ServiceModal
        isOpen={openServiceModal}
        service={editingService}
        onClose={() => {
          setOpenServiceModal(false);
          setEditingService(null);
        }}
        onSuccess={loadServices}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Service"
        message="Delete this service permanently?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          try {
            await deleteService(deleteId);

            toast.success("Service deleted successfully.");

            setDeleteId(null);

            await loadServices();
          } catch (err) {
            console.error(err);
            toast.error("Failed to delete service.");
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      {selectedService && (
        <div className="view-service-overlay">
          <div className="view-service-modal">
            <div className="view-service-header">
              <h2>Service Details</h2>

              <button
                className="close-btn"
                onClick={() => setSelectedService(null)}
              >
                ✕
              </button>
            </div>

            <div className="view-service-grid">
              <div>
                <label>Title</label>
                <p>{selectedService.title}</p>
              </div>

              <div>
                <label>Slug</label>
                <p>{selectedService.slug}</p>
              </div>

              <div className="full-width">
                <label>Short Description</label>
                <p>{selectedService.shortDescription}</p>
              </div>

              <div className="full-width">
                <label>Menu Description</label>
                <p>{selectedService.menuDescription || "N/A"}</p>
              </div>

              <div className="full-width">
                <label>Hero Description</label>
                <p>{selectedService.heroDescription}</p>
              </div>

              <div>
                <label>Section Title</label>
                <p>{selectedService.sectionTitle || "N/A"}</p>
              </div>

              <div>
                <label>Product Category</label>
                <p>{selectedService.productCategory || "N/A"}</p>
              </div>

              <div className="full-width">
                <label>Section Description</label>
                <p>{selectedService.sectionDescription || "N/A"}</p>
              </div>

              <div className="full-width">
                <label>Checklist</label>

                {selectedService.checklist?.length ? (
                  <ul>
                    {selectedService.checklist.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No checklist added.</p>
                )}
              </div>

              <div>
                <label>Status</label>

                <span
                  className={`status ${
                    selectedService.isPublished ? "active" : "draft"
                  }`}
                >
                  {selectedService.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div>
                <label>Hero Image</label>

                {selectedService.heroImage ? (
                  <img
                    src={selectedService.heroImage}
                    alt={selectedService.title}
                    className="service-image-preview"
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
