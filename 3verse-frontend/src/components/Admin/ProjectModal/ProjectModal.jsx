import { useState, useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";

import { createProject, updateProject } from "../../../services/projectService";

import "./ProjectModal.css";

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  shortDescription: "",
  description: "",

  technologies: "",

  coverImage: null,
  gallery: [],

  client: "",
  completionDate: "",
  liveUrl: "",
  githubUrl: "",

  isFeatured: false,
  displayOrder: 0,
  isPublished: true,
};

const createFormData = (project) => {
  if (!project) {
    return { ...emptyForm, gallery: [] };
  }

  return {
    title: project.title || "",
    slug: project.slug || "",
    category: project.category || "",
    shortDescription: project.shortDescription || "",
    description: project.description || "",

    technologies: (project.technologies || []).join(", "),

    coverImage: project.coverImage || null,
    gallery: project.gallery || [],

    client: project.client || "",
    completionDate: project.completionDate
      ? project.completionDate.slice(0, 10)
      : "",
    liveUrl: project.liveUrl || "",
    githubUrl: project.githubUrl || "",

    isFeatured: project.isFeatured || false,
    displayOrder: project.displayOrder || 0,
    isPublished: project.isPublished !== undefined ? project.isPublished : true,
  };
};

export default function ProjectModal({
  isOpen,
  onClose,
  onSuccess,
  project = null,
}) {
  const [loading, setLoading] = useState(false);

  const initialForm = useMemo(() => createFormData(project), [project]);
  const [form, setForm] = useState(() => createFormData(project));
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setForm(initialForm);
  }, [initialForm]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGalleryChange = (e) => {
    setForm((prev) => ({
      ...prev,
      gallery: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        technologies: form.technologies,
      };

      if (project) {
        await updateProject(project._id, payload);
        toast.success("Project updated successfully.");
      } else {
        await createProject(payload);
        toast.success("Project created successfully.");
      }

      onSuccess();
      onClose();
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay project-modal-overlay">
      <div className="project-modal">
        <div className="project-modal-header">
          <h2>{project ? "Edit Project" : "Add Project"}</h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close project modal"
          >
            ✕
          </button>
        </div>

        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Project Title</label>
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
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Client</label>
              <input
                type="text"
                name="client"
                value={form.client}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Completion Date</label>
              <input
                type="date"
                name="completionDate"
                value={form.completionDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Live URL</label>
              <input
                type="text"
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="text"
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>Technologies (comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="form-group">
            <label>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  coverImage: e.target.files[0],
                })
              }
            />

            {form.coverImage && (
              <div className="image-preview">
                <img
                  src={
                    typeof form.coverImage === "string"
                      ? form.coverImage
                      : URL.createObjectURL(form.coverImage)
                  }
                  alt=""
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Gallery Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryChange}
            />

            <div className="gallery-preview">
              {form.gallery.map((img, index) => (
                <img
                  key={index}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt=""
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Short Description</label>
            <textarea
              rows="2"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="5"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />
              Featured Project
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
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
                : project
                  ? "Update Project"
                  : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
