
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "../styles/ProductsGrid.css";

const ProductsGrid = ({
  products = [],
  title,
  onAdd,
  loading = false,
}) => {
  // Call the hook once, outside the map
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (loading) {
    return <p className="products-status">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="products-status">No products found.</p>;
  }

  return (
    <section className="products-section">
      {title && (
        <h2 className="products-heading">{title}</h2>
      )}

      <Row className="g-3 g-lg-4">
        {products.map((product) => {
          const cartItem = cartItems.find(
            (item) => item.id === product.id
          );

          return (
            <Col
              key={product._id}
              xs={6}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="product-column"
            >
              <Link
                to={`/product/${product._id}`}
                className="product-link"
              >
                <Card className="product-card">
                  <div className="product-image-wrapper">
                  
                    <img
                      src={product.image}

                      alt={product.title}
                      className="product-image"
                    />
                  </div>

                  <Card.Body className="product-body">
                    {product.deliveryTime && (
                      <div className="delivery-time">
                        ⏱ {product.deliveryTime}
                      </div>
                    )}

                    <Card.Title className="product-title">
                      {product.title}
                      
                    </Card.Title>

                    {product.category && (
                      <div className="product-category">
                        {product.category}
                      </div>
                    )}

                    <div className="product-bottom">
                      <strong className="product-price">
                        ₹{Number(product.price).toFixed(2)}
                      </strong>

                      {!cartItem ? (
                        <Button
                          variant="outline-success"
                          className="add-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onAdd?.(product);
                            addToCart(product);
                          }}
                        >
                          ADD
                        </Button>
                      ) : (
                        <div
                          className="quantity-control"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="quantity-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              decreaseQuantity(product.id);
                            }}
                          >
                            −
                          </button>

                          <span className="quantity-value">
                            {cartItem.quantity}
                          </span>

                          <button
                            type="button"
                            className="quantity-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              increaseQuantity(product.id);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default ProductsGrid;
