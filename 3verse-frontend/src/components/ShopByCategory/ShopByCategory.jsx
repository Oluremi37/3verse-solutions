import "./ShopByCategory.css";
import {
  FiGrid,
  FiPhone,
  FiVideo,
  FiMonitor,
  FiPrinter,
  FiTv,
  FiHeadphones,
} from "react-icons/fi";

const categories = [
  { icon: <FiPhone />, name: "IP Telephony" },
  { icon: <FiVideo />, name: "Video Conferencing" },
  { icon: <FiMonitor />, name: "Laptops & Desktops" },
  { icon: <FiPrinter />, name: "Printers" },
  { icon: <FiTv />, name: "Digital Signage" },
  { icon: <FiHeadphones />, name: "Audio & Headset" },
];

export default function ShopByCategory({
  products = [],
  selectedCategory = "",
  onSelectCategory,
}) {
  const getCategoryCount = (categoryName) => {
    return products.filter(
      (product) =>
        product.category?.toLowerCase() === categoryName.toLowerCase(),
    ).length;
  };

  const handleCategoryClick = (categoryName) => {
    // Clicking the already-active category deselects it (shows all again)
    if (selectedCategory === categoryName) {
      onSelectCategory?.("");
    } else {
      onSelectCategory?.(categoryName);
    }
  };

  return (
    <section className="shop-category-section">
      <div className="shop-category-container">
        <div className="shop-category-header">
          <h2>Shop by Category</h2>

          <p>
            Browse products by category to quickly find the perfect solution for
            your business.
          </p>
        </div>

        <div className="shop-category-grid">
          <button
            className={`category-card ${
              selectedCategory === "" ? "active" : ""
            }`}
            onClick={() => onSelectCategory?.("")}
          >
            <div className="category-icon">
              <FiGrid />
            </div>

            <h4>All Products</h4>

            <p>{products.length} Products</p>
          </button>

          {categories.map((cat) => {
            const count = getCategoryCount(cat.name);

            return (
              <button
                key={cat.name}
                className={`category-card ${
                  selectedCategory === cat.name ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="category-icon">{cat.icon}</div>

                <h4>{cat.name}</h4>

                <p>
                  {count} {count === 1 ? "Product" : "Products"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
