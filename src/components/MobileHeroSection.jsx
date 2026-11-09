
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../styles/MobileHeroSection.css";
import MobileCategoryNavbar from "./MobileCategoryNavbar";

const MobileHeroSection = () => {
  const { products, loading, error } = useProducts();

  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  // Select up to 6 products from backend
  const featuredProducts = productList.slice(10, 16);

  return (
    <>
      <MobileCategoryNavbar />

      <section className="festival-section">

        <div className="festival-header">
          <p className="festival-subtitle">
            GET READY FOR
          </p>

          <h2 className="festival-title">
            Bhau Beej
          </h2>
        </div>

        <div className="festival-banner">
          <img
            src="/images/bhaubeej-banner.png"
            alt="Bhau Beej"
          />
        </div>

        {loading && <h3>Loading products...</h3>}

        {error && <h3>{error}</h3>}

        {!loading && !error && (
          <div className="festival-grid">

            {featuredProducts.map((item) => (
              <Link
                key={item._id || item.id}
                to={`/product/${item._id || item.id}`}
                className="festival-card"
              >
               <h4>{item.title.split(" ").slice(0, 2).join(" ")}</h4>

                <img
                  src={item.image}
                  alt={item.title}
                />
              </Link>
            ))}

          </div>
        )}

      </section>
    </>
  );
};

export default MobileHeroSection;
