
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

import "../styles/AllProducts.css";

function AllProducts() {

  const { products: productData, loading, error } = useProducts();

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  // Supports both array and API response
  const products = Array.isArray(productData)
    ? productData
    : productData?.products || [];

  const scrollRefs = useRef({});

  const [expandedCategories, setExpandedCategories] = useState([]);

  // =========================
  // GROUP PRODUCTS BY BACKEND CATEGORY
  // =========================

  const groupedProducts = products.reduce((groups, product) => {

    const category =
      typeof product.category === "string"
        ? product.category
        : product.category?.name ||
          product.category?.categoryName ||
          "Other Products";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(product);

    return groups;

  }, {});

  const categories = Object.entries(groupedProducts);

  // =========================
  // SCROLL CATEGORY
  // =========================

  const scrollCategory = (category, direction) => {

    const container = scrollRefs.current[category];

    if (container) {
      container.scrollBy({
        left: direction * 700,
        behavior: "smooth"
      });
    }
  };

  // =========================
  // EXPAND / COLLAPSE CATEGORY
  // =========================

  const toggleCategory = (category) => {

    setExpandedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );
  };

  // =========================
  // FORMAT PRICE
  // =========================

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  // =========================
  // PRODUCT NAVIGATION
  // =========================

  const openProduct = (product) => {

    const productId = product._id || product.id;

    if (productId) {
      navigate(`/product/${productId}`);
    }

  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <div className="products-message">Loading products...</div>;
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return <div className="products-message">{error}</div>;
  }

  // =========================
  // NO PRODUCTS
  // =========================

  if (!products.length) {
    return <div className="products-message">No products available.</div>;
  }

  // =========================
  // UI
  // =========================

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

                // =========================
                // CART ITEM LOGIC
                // =========================

                const productId = product.id ?? product._id;

                const cartItem = cartItems.find(
                  (item) =>
                    String(item.id ?? item._id) === String(productId)
                );

                return (

                  <div
                    className="product-card"
                    key={product._id || product.id}

                    // Click card to open product details
                    onClick={() => openProduct(product)}

                    role="link"
                    tabIndex={0}

                    onKeyDown={(e) => {
                      if (
                        e.target === e.currentTarget &&
                        (e.key === "Enter" || e.key === " ")
                      ) {
                        e.preventDefault();
                        openProduct(product);
                      }
                    }}
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

                    <h3
                      className="product-title"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    <p className="product-size">
                      {productSize || " "}
                    </p>

                    <div className="product-bottom">

                      <div className="product-prices">

                        <strong>
                          ₹{formatPrice(price)}
                        </strong>

                        {mrp > price && (
                          <del>
                            ₹{formatPrice(mrp)}
                          </del>
                        )}

                      </div>

                      {/* =========================
                          ADD TO CART / QUANTITY
                      ========================== */}

                      {!cartItem ? (

                        <button
                          className="add-to-cart-btn"
                          type="button"

                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          ADD
                        </button>

                      ) : (

                        <div
                          className="quantity-control"

                          onClick={(e) => e.stopPropagation()}
                        >

                          <button
                            className="add-to-cart-btn"
                            type="button"

                            onClick={() =>
                              decreaseQuantity(productId)
                            }
                          >
                            −
                          </button>

                          <span>
                            {cartItem.quantity}
                          </span>

                          <button
                            className="add-to-cart-btn"
                            type="button"

                            onClick={() =>
                              increaseQuantity(productId)
                            }
                          >
                            +
                          </button>

                        </div>

                      )}

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
