
import { useRef, useState } from "react";
import { useProducts } from "../context/ProductContext";

import {useCart} from "../context/CartContext";
import "../styles/AllProducts.css";

function AllProducts() {
  const { products: productData, loading, error } = useProducts();
  const { addToCart } = useCart();

  // Supports both an array and an API response containing products.
  const products = Array.isArray(productData)
    ? productData
    : productData?.products || [];

  const scrollRefs = useRef({});
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Group products according to their category.
  const groupedProducts = products.reduce((groups, product) => {
    const category = product.category || "Other Products";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(product);
    return groups;
  }, {});

  const categories = Object.entries(groupedProducts);

  const scrollCategory = (category, direction) => {
    const container = scrollRefs.current[category];

    if (container) {
      container.scrollBy({
        left: direction * 700,
        behavior: "smooth"
      });
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );
  };

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  if (loading) {
    return <div className="products-message">Loading products...</div>;
  }

  if (error) {
    return <div className="products-message">{error}</div>;
  }

  if (!products.length) {
    return <div className="products-message">No products available.</div>;
  }

  return (
    <div className="all-products-container">
      {categories.map(([category, categoryProducts]) => {
        const isExpanded = expandedCategories.includes(category);

        return (
          <section className="category-section" key={category}>

            {/* Category heading */}
            <div className="category-heading">
              <h2>{category}</h2>

              <button
                className="see-all-btn"
                onClick={() => toggleCategory(category)}
              >
                {isExpanded ? "see less" : "see all"}
              </button>
            </div>

            {/* Product cards */}
            <div
              className={
                isExpanded
                  ? "products-grid"
                  : "products-horizontal"
              }
              ref={(element) => {
                scrollRefs.current[category] = element;
              }}
            >
              {categoryProducts.map((product) => {
                const price = Number(product.price || 0);
                const mrp = Number(
                  product.mrp || product.originalPrice || 0
                );

                const discount =
                  mrp > price && mrp > 0
                    ? Math.round(((mrp - price) / mrp) * 100)
                    : 0;

                const productSize =
                  product.quantity ||
                  product.size ||
                  product.unit ||
                  "";

                return (
                  <div
                    className="product-card"
                    key={product._id || product.id}
                  >
                    {discount > 0 && (
                      <div className="discount-badge">
                        {discount}% OFF
                      </div>
                    )}

                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                        loading="lazy"
                      />
                    </div>

                    <div className="delivery-time">
                      <span>⏱</span> 20 MINS
                    </div>

                    <h3 className="product-title" title={product.title}>
                      {product.title}
                    </h3>

                    <p className="product-size">
                      {productSize || " "}
                    </p>

                    <div className="product-bottom">
                      <div className="product-prices">
                        <strong>₹{formatPrice(price)}</strong>

                        {mrp > price && (
                          <del>₹{formatPrice(mrp)}</del>
                        )}
                      </div>

                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation arrows only in horizontal mode */}
            {!isExpanded && categoryProducts.length > 5 && (
              <>
                <button
                  className="category-arrow left-arrow"
                  onClick={() => scrollCategory(category, -1)}
                  aria-label={`Scroll ${category} left`}
                >
                  &#8249;
                </button>

                <button
                  className="category-arrow right-arrow"
                  onClick={() => scrollCategory(category, 1)}
                  aria-label={`Scroll ${category} right`}
                >
                  &#8250;
                </button>
              </>
            )}

          </section>
        );
      })}
    </div>
  );
}

export default AllProducts;
