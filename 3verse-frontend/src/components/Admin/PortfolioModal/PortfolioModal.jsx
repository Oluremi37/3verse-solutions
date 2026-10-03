import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createPortfolio,
  updatePortfolio,
} from "../../../services/portfolioService";

import "./PortfolioModal.css";

export default function PortfolioModal({
  isOpen,
  onClose,
  portfolio,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    industry: "",
    showTitle: false,
    showIndustry: false,
    description: "",
    result: "",
    displayOrder: 0,
    isFeatured: false,
    isPublished: true,
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = setTimeout(() => {
      if (portfolio) {
        setForm({
          title: portfolio.title || "",
          industry: portfolio.industry || "",
          showTitle: portfolio.showTitle || false,
          showIndustry: portfolio.showIndustry || false,
          description: portfolio.description || "",
          result: portfolio.result || "",
          displayOrder: portfolio.displayOrder || 0,
          isFeatured: portfolio.isFeatured || false,
          isPublished: portfolio.isPublished,
        });

        setPreviewImages(portfolio.images || []);
        setImages([]);
      } else {
        setForm({
          title: "",
          industry: "",
          showTitle: false,
          showIndustry: false,
          description: "",
          result: "",
          displayOrder: 0,
          isFeatured: false,
          isPublished: true,
        });

        setPreviewImages([]);
        setImages([]);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isOpen, portfolio]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "displayOrder"
            ? Number(value)
            : value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setImages(files);

    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("industry", form.industry);
      formData.append("showTitle", form.showTitle);
      formData.append("showIndustry", form.showIndustry);
      formData.append("description", form.description);
      formData.append("result", form.result);

      formData.append("displayOrder", form.displayOrder);

      formData.append("isFeatured", form.isFeatured);
      formData.append("isPublished", form.isPublished);

      images.forEach((image) => {
        formData.append("images", image);
      });

      if (portfolio) {
        await updatePortfolio(portfolio._id, formData);

        toast.success("Portfolio updated successfully.");
      } else {
        await createPortfolio(formData);

        toast.success("Portfolio created successfully.");
      }

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="team-modal">
        <div className="team-modal-header">
          <h2>
            {portfolio ? "Edit Portfolio Project" : "Add Portfolio Project"}
          </h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="team-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Project Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Industry</label>

              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
              >
                <option value="">Select Industry</option>

                <option value="Oil & Gas">Oil & Gas</option>

                <option value="Banking">Banking</option>

                <option value="Education">Education</option>

                <option value="Manufacturing">Manufacturing</option>

                <option value="Government">Government</option>

                <option value="Healthcare">Healthcare</option>

                <option value="Technology">Technology</option>

                <option value="Telecommunications">Telecommunications</option>
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="showTitle"
                  checked={form.showTitle}
                  onChange={handleChange}
                />
                Show Project Title on Website
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="showIndustry"
                  checked={form.showIndustry}
                  onChange={handleChange}
                />
                Show Industry Badge on Website
              </label>
            </div>
            
            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Project Result</label>

              <textarea
                rows="3"
                name="result"
                value={form.result}
                onChange={handleChange}
                required
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

            <div className="form-group full-width">
              <label>Project Images</label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
              />

              {previewImages.length > 0 && (
                <div className="portfolio-preview-grid">
                  {previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="portfolio-preview-image"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="form-group checkbox-group full-width">
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

            <div className="form-group checkbox-group full-width">
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
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : portfolio
                  ? "Update Portfolio"
                  : "Create Portfolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
