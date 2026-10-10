import { useState, useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";

import { createProduct, updateProduct } from "../../../services/productService";

import "./ProductModal.css";

const emptyForm = {
  name: "",
  slug: "",
  category: "",
  brand: "",

  thumbnail: null,
  gallery: [],

  price: "",
  salePrice: "",
  sku: "",
  stock: "",
  availabilityStatus: "In Stock",

  popularity: 50,

  shortDescription: "",
  description: "",

  features: "",

  specifications: [
    {
      key: "",
      value: "",
    },
  ],

  featured: false,

  status: "Active",
};
const PRODUCT_CATEGORIES = [
  "IP Telephony",
  "Video Conferencing",
  "Laptops & Desktops",
  "Printers",
  "Digital Signage",
  "Audio & Headset",
];

const AVAILABILITY_OPTIONS = [
  "In Stock",
  "Out of Stock",
  "Available in 1 Week",
  "Available in 2 Weeks",
  "Available in 4 Weeks",
  "Pre-Order",
];

const createFormData = (product) => {
  if (!product) {
    return {
      ...emptyForm,
      gallery: [],
      specifications: [
        {
          key: "",
          value: "",
        },
      ],
    };
  }

  return {
    name: product.name || "",
    slug: product.slug || "",
    category: product.category || "",
    brand: product.brand || "",

    thumbnail: product.thumbnail || null,
    gallery: product.gallery || [],

    price: product.price || "",
    salePrice: product.salePrice || "",
    sku: product.sku || "",
    stock: product.stock || "",
    availabilityStatus: product.availabilityStatus || "In Stock",

    popularity: product.popularity || 50,

    shortDescription: product.shortDescription || "",
    description: product.description || "",

    features: (product.features || []).join("\n"),

    specifications:
      product.specifications && Object.keys(product.specifications).length > 0
        ? Object.entries(product.specifications).map(([key, value]) => ({
            key,
            value,
          }))
        : [
            {
              key: "",
              value: "",
            },
          ],

    featured: product.featured || false,

    status: product.status || "Active",
  };
};

export default function ProductModal({
  isOpen,
  onClose,
  onSuccess,
  product = null,
}) {
  const [loading, setLoading] = useState(false);

  const initialForm = useMemo(() => createFormData(product), [product]);
  const [form, setForm] = useState(() => createFormData(product));
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

  const handleSpecificationChange = (index, field, value) => {
    const updated = [...form.specifications];

    updated[index][field] = value;

    setForm({
      ...form,
      specifications: updated,
    });
  };

  const addSpecification = () => {
    setForm({
      ...form,
      specifications: [
        ...form.specifications,
        {
          key: "",
          value: "",
        },
      ],
    });
  };

  const removeSpecification = (index) => {
    const updated = [...form.specifications];

    updated.splice(index, 1);

    setForm({
      ...form,
      specifications: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,

        features: form.features
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        specifications: form.specifications.reduce((acc, item) => {
          if (item.key.trim()) {
            acc[item.key] = item.value;
          }

          return acc;
        }, {}),
      };

      if (product) {
        await updateProduct(product._id, payload);

        toast.success("Product updated successfully.");
      } else {
        await createProduct(payload);

        toast.success("Product created successfully.");
      }

      onSuccess();

      onClose();

      setForm(emptyForm);
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay product-modal-overlay">
      <div className="product-modal">
        <div className="product-modal-header">
          <h2>{product ? "Edit Product" : "Add Product"}</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
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

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>

                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>

              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price (₦) — optional</label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Sale Price (₦)</label>

              <input
                type="number"
                name="salePrice"
                value={form.salePrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>SKU</label>

              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Stock</label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Availability Status</label>

              <select
                name="availabilityStatus"
                value={form.availabilityStatus}
                onChange={handleChange}
              >
                {AVAILABILITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Popularity</label>

            <input
              type="number"
              name="popularity"
              value={form.popularity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  thumbnail: e.target.files[0],
                })
              }
            />

            {form.thumbnail && (
              <div className="image-preview">
                <img
                  src={
                    typeof form.thumbnail === "string"
                      ? form.thumbnail
                      : URL.createObjectURL(form.thumbnail)
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
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Features (One Per Line)</label>

            <textarea
              rows="6"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder={`Feature 1
                 Feature 2
                 Feature 3`}
            />
          </div>

          <div className="form-group">
            <label>Specifications</label>

            {form.specifications.map((spec, index) => (
              <div className="spec-row" key={index}>
                <input
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecificationChange(index, "key", e.target.value)
                  }
                />

                <input
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecificationChange(index, "value", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-spec-btn"
              onClick={addSpecification}
            >
              + Add Specification
            </button>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured Product
            </label>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : product
                  ? "Update Product"
                  : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
