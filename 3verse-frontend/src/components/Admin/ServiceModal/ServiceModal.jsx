import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { createService, updateService } from "../../../services/serviceService";
import { uploadImage } from "../../../services/uploadService";

import "./ServiceModal.css";

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  menuDescription: "",
  heroDescription: "",
  sectionTitle: "",
  sectionDescription: "",
  checklist: "",
  productCategory: "",
  icon: "",
  heroImage: "",
  isPublished: true,
};

export default function ServiceModal({
  isOpen,
  onClose,
  onSuccess,
  service = null,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    // Defer setting state to avoid synchronous setState inside the effect
    // which can trigger cascading renders in strict mode.
    const t = setTimeout(() => {
      if (service) {
        setForm({
          title: service.title || "",
          slug: service.slug || "",
          shortDescription: service.shortDescription || "",
          menuDescription: service.menuDescription || "",
          heroDescription: service.heroDescription || "",
          sectionTitle: service.sectionTitle || "",
          sectionDescription: service.sectionDescription || "",
          checklist: service.checklist?.join("\n") || "",
          productCategory: service.productCategory || "",
          icon: service.icon || "",
          heroImage: service.heroImage || "",
          isPublished: service.isPublished ?? true,
        });
      } else {
        setForm(emptyForm);
      }
    }, 0);

    return () => clearTimeout(t);
  }, [service, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

    
    const handleImageUpload = async (e) => {
      const { name, files } = e.target;

      if (!files || !files[0]) return;

      try {
        setLoading(true);

        const imageUrl = await uploadImage(files[0]);

        setForm((prev) => ({
          ...prev,
          [name]: imageUrl,
        }));

        toast.success("Image uploaded successfully.");
      } catch (err) {
        console.error(err);

        toast.error("Image upload failed.");
      } finally {
        setLoading(false);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (service) {
        const payload = {
          ...form,
          checklist: form.checklist
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        };

        await updateService(service._id, payload);  

        toast.success("Service updated successfully.");
      } else {
        const payload = {
          ...form,
          checklist: form.checklist
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        };

        await createService(payload);

        toast.success("Service created successfully.");
      }

      onSuccess();

      onClose();

      setForm(emptyForm);
    } catch (err) {
      console.error(err);

      toast.error(
        service ? "Failed to update service." : "Failed to create service.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="service-modal">
        <div className="service-modal-header">
          <h2>{service ? "Edit Service" : "Add Service"}</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="service-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Slug</label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Service Icon</label>

              <input
                type="file"
                accept="image/*"
                name="icon"
                onChange={handleImageUpload}
              />

              {form.icon && (
                <img
                  src={form.icon}
                  alt="Icon Preview"
                  className="image-preview"
                />
              )}
            </div>

            <div className="form-group">
              <label>Hero Image</label>

              <input
                type="file"
                accept="image/*"
                name="heroImage"
                onChange={handleImageUpload}
              />

              {form.heroImage && (
                <img
                  src={form.heroImage}
                  alt="Hero Preview"
                  className="image-preview"
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Short Description</label>

            <textarea
              rows="3"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Menu Description</label>

            <textarea
              rows="2"
              name="menuDescription"
              value={form.menuDescription}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Section Title</label>

            <input
              type="text"
              name="sectionTitle"
              value={form.sectionTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Section Description</label>

            <textarea
              rows="4"
              name="sectionDescription"
              value={form.sectionDescription}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Checklist (one item per line)</label>

            <textarea
              rows="5"
              name="checklist"
              value={form.checklist}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Product Category</label>

            <input
              type="text"
              name="productCategory"
              value={form.productCategory}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Hero Description</label>

            <textarea
              rows="5"
              name="heroDescription"
              value={form.heroDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Published</label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
              />
              Published
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : service
                  ? "Update Service"
                  : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
