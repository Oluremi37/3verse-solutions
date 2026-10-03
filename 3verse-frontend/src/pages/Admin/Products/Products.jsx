import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiPackage, FiCheckCircle, FiXCircle, FiArchive } from "react-icons/fi";

import {
  getAdminProducts,
  deleteProduct,
} from "../../../services/productService";

import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";
import ProductModal from "../../../components/Admin/ProductModal/ProductModal";

import "./Products.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export default function Products() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openProductModal, setOpenProductModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const loadProducts = async ({ skipInitialLoading = false } = {}) => {
    try {
      if (!skipInitialLoading) {
        setLoading(true);
      }

      const data = await getAdminProducts();

      setProducts(data.products || []);
      setStats(data.stats || {});
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadProducts({ skipInitialLoading: true });
    };

    init();
  }, []);

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(keyword) ||
      product.category?.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword)
    );
  });

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (product) => (
        <img
          src={product.thumbnail || "/placeholder.png"}
          alt={product.name}
          className="product-thumbnail"
        />
      ),
    },
    {
      key: "name",
      label: "Product",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "price",
      label: "Price",
      render: (product) => formatPrice(product.price),
    },
    {
      key: "stock",
      label: "Stock",
    },
    {
      key: "status",
      label: "Status",
      render: (product) => (
        <span className={`status ${product.status.toLowerCase()}`}>
          {product.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (product) => new Date(product.createdAt).toLocaleDateString(),
    },
  ];
  return (
    <div className="products-page">
      <PageHeader
        title="Products"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search products..."
        buttonText="Add Product"
        onButtonClick={() => {
          setSelectedProduct(null);
          setOpenProductModal(true);
        }}
      />

      <StatsCards
        cards={[
          {
            title: "Total Products",
            value: stats.total || 0,
            icon: <FiPackage />,
          },
          {
            title: "Active",
            value: stats.active || 0,
            icon: <FiCheckCircle />,
          },
          {
            title: "Inactive",
            value: stats.inactive || 0,
            icon: <FiXCircle />,
          },
          {
            title: "Out of Stock",
            value: stats.outOfStock || 0,
            icon: <FiArchive />,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filteredProducts}
        loading={loading}
        emptyMessage="No products found."
        renderActions={(product) => (
          <div className="actions">
            <button onClick={() => setSelectedProduct(product)}>View</button>

            <button
              onClick={() => {
                setSelectedProduct(product);
                setOpenProductModal(true);
              }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => setDeleteId(product._id)}
            >
              Delete
            </button>
          </div>
        )}
      />

      <ProductModal
        key={selectedProduct?._id || "new"}
        isOpen={openProductModal}
        product={selectedProduct}
        onClose={() => {
          setOpenProductModal(false);
          setSelectedProduct(null);
        }}
        onSuccess={loadProducts}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Product"
        message="Delete this product permanently?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          try {
            await deleteProduct(deleteId);

            toast.success("Product deleted successfully.");

            setDeleteId(null);

            loadProducts();
          } catch (err) {
            console.error(err);

            toast.error("Failed to delete product.");
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
      {selectedProduct && !openProductModal && (
        <div
          className="view-product-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="view-product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="view-product-header">
              <h2>Product Details</h2>

              <button
                className="close-btn"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>
            </div>

            <div className="view-product-grid">
              <div>
                <label>Name</label>
                <p>{selectedProduct.name}</p>
              </div>

              <div>
                <label>Category</label>
                <p>{selectedProduct.category}</p>
              </div>

              <div>
                <label>Brand</label>
                <p>{selectedProduct.brand || "N/A"}</p>
              </div>

              <div>
                <label>Price</label>
                <p>{formatPrice(selectedProduct.price)}</p>
              </div>

              <div>
                <label>Sale Price</label>
                <p>
                  {selectedProduct.salePrice
                    ? formatPrice(selectedProduct.salePrice)
                    : "N/A"}
                </p>
              </div>

              <div>
                <label>Stock</label>
                <p>{selectedProduct.stock}</p>
              </div>

              <div>
                <label>SKU</label>
                <p>{selectedProduct.sku || "N/A"}</p>
              </div>

              <div>
                <label>Status</label>
                <span
                  className={`status ${selectedProduct.status.toLowerCase()}`}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <div>
                <label>Popularity</label>
                <p>{selectedProduct.popularity}</p>
              </div>

              <div className="full-width">
                <label>Short Description</label>
                <p>{selectedProduct.shortDescription}</p>
              </div>

              <div className="full-width">
                <label>Description</label>
                <p>{selectedProduct.description}</p>
              </div>

              <div className="full-width">
                <label>Features</label>

                {selectedProduct.features?.length ? (
                  <ul>
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No features added.</p>
                )}
              </div>

              <div className="full-width">
                <label>Gallery</label>

                {selectedProduct.gallery?.length ? (
                  <div className="gallery-grid">
                    {selectedProduct.gallery.map((img, index) => (
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
