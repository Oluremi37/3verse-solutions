import { Link } from "react-router-dom";
import "./Products.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();

        // Handle both array and { products: [] } response shapes
        const list = Array.isArray(response)
          ? response
          : response?.products || [];

        setProducts(list);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 3);

  return (
    <section className="products-preview-section" id="products">
      <div className="products-preview-container">
        <ScrollReveal>
          <div className="products-preview-header">
            <div>
              <span className="section-tag_1">Products</span>
              <h2 className="section-title">
                Technology that powers modern workplaces
              </h2>
            </div>

            <Link to="/products" className="view-all-link">
              View All Products
            </Link>
          </div>  
        </ScrollReveal>

        <div className="products-preview-grid">
          {featuredProducts.map((product, index) => (
            <ScrollReveal key={product._id || index} delay={index * 0.1}>
              <div className="product-card">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
