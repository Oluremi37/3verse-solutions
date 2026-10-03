import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./ProductDetail.css";

import { getProductBySlug, getProducts } from "../../services/productService";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, productsData] = await Promise.all([
          getProductBySlug(slug),
          getProducts(),
        ]);

        setProduct(productData);
        setProducts(productsData);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [slug]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product-not-found">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  const handleRequestQuote = () => {
    navigate("/request-quote", {
      state: {
        itemName: product.name,
        itemType: "product",
      },
    });
  };

  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.thumbnail];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <section className="product-detail-section">
        <div className="product-detail-container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>

            <Link to="/products">Products</Link>
            <span>/</span>

            <Link to="/products">{product.category}</Link>
            <span>/</span>

            <span className="current">{product.name}</span>
          </div>

          <div className="product-detail-grid">
            <div className="product-detail-images">
              <div className="main-image">
                <img src={images[activeImage]} alt={product.name} />
              </div>

              {images.length > 1 && (
                <div className="thumbnail-row">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${
                        activeImage === index ? "active" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={img} alt={product.name} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-detail-info">
              <h1>{product.name}</h1>

              {product.availabilityStatus && (
                <span
                  className={`availability-badge ${product.availabilityStatus
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {product.availabilityStatus}
                </span>
              )}

              <h4>Description</h4>

              <p className="product-description">{product.description}</p>

              {product.features?.length > 0 && (
                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}

              <div className="product-detail-buttons">
                <button className="btn-quote" onClick={handleRequestQuote}>
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="related-products">
              <h3>Related Products</h3>

              <div className="related-products-grid">
                {relatedProducts.map((related) => (
                  <div className="product-card" key={related._id}>
                    <div className="product-image">
                      <img src={related.thumbnail} alt={related.thumbnail} />
                    </div>

                    <div className="product-content">
                      <h3>{related.name}</h3>

                      <p className="category">{related.shortDescription}</p>

                      {related.availabilityStatus && (
                        <span
                          className={`availability-badge ${related.availabilityStatus
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {related.availabilityStatus}
                        </span>
                      )}

                      <div className="product-buttons">
                        <Link
                          to={`/products/${related.slug}`}
                          className="btn-view"
                        >
                          View Details
                        </Link>

                        <button
                          className="btn-quote"
                          onClick={() =>
                            navigate("/request-quote", {
                              state: {
                                itemName: related.name,
                                itemType: "product",
                              },
                            })
                          }
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
