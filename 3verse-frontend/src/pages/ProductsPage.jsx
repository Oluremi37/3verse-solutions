import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import ProductsHero from "../components/ProductsHero/ProductsHero.jsx";
import ShopByCategory from "../components/ShopByCategory/ShopByCategory.jsx";
import ProductsCatalog from "../components/ProductsCatalog/ProductsCatalog";
import Footer from "../components/Footer/Footer";

import { getProducts } from "../services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar />

      <ProductsHero />

      <ShopByCategory
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <ProductsCatalog
        products={products}
        selectedCategory={selectedCategory}
      />

      <Footer />
    </>
  );
}
