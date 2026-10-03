import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import "./ProductsCatalog.css";

export default function ProductsCatalog({
  products = [],
  selectedCategory = "",
}) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [sortBy, setSortBy] = useState("popular");

  const brands = useMemo(() => {
    return [
      "All Brands",
      ...new Set(products.map((p) => p.brand).filter(Boolean)),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()),
    );

    // Category filter
    if (selectedCategory) {
      result = result.filter(
        (p) =>
          p.category?.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase(),
      );
    }

    // Brand filter
    if (selectedBrand !== "All Brands") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case "nameAZ":
        result = [...result].sort((a, b) =>
          (a.name || "").localeCompare(b.name || ""),
        );
        break;

      case "popular":
      default:
        result = [...result].sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0),
        );
        break;
    }

    return result;
  }, [products, search, selectedCategory, selectedBrand, sortBy]);

  return (
    <section className="products-catalog-section" id="products">
      <div className="products-catalog-container">
        <div className="products-catalog-header">
          <h2>
            Products{" "}
            <span className="products-count">
              ({filteredProducts.length} products)
            </span>
          </h2>

          <div className="products-controls">
            {/* Search */}
            <div className="search-wrapper">
              <FiSearch className="search-icon" />

              <input
                type="text"
                className="search-input"
                placeholder="Search Products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Brand Filter */}
            <div className="select-wrapper">
              <select
                className="filter-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <FiChevronDown className="select-chevron" />
            </div>

            {/* Sort */}
            <div className="select-wrapper">
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Sort by: Popular</option>
                <option value="nameAZ">Name: A-Z</option>
              </select>

              <FiChevronDown className="select-chevron" />
            </div>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <p className="no-results">No products match your search.</p>
        ) : (
          <div className="products-catalog-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">
                  <img src={product.thumbnail} alt={product.name} />
                </div>

                <div className="product-content">
                  <h3>{product.name}</h3>

                  <p className="category">{product.shortDescription}</p>

                  {product.availabilityStatus && (
                    <span
                      className={`availability-badge ${product.availabilityStatus
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {product.availabilityStatus}
                    </span>
                  )}

                  <div className="product-buttons">
                    <Link to={`/products/${product.slug}`} className="btn-view">
                      View Details
                    </Link>

                    <Link
                      to="/request-quote"
                      state={{
                        itemName: product.name,
                        itemType: "product",
                      }}
                      className="btn-quote"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
