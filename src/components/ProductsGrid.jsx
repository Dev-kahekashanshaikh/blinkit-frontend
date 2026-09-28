import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "../styles/ProductsGrid.css";

const ProductsGrid = ({
  products = [],
  title,
  onAdd,
  loading = false,
}) => {
  if (loading) {
    return <p className="products-status">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="products-status">No products found.</p>;
  }

  return (
    <section className="products-section">
      {title && <h2 className="products-heading">{title}</h2>}

      <Row className="g-3 g-lg-4">
        {products.map((product) => (
          <Col
            key={product.id}
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className="d-flex"
          >
          <Link
                                        to={`/product/${product._id}`}
                                        className="product-link"
                                        key={product.id}
                                    >
            <Card className="product-card w-100">
              {/* Product image */}
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </div>

              <Card.Body className="product-body">
                {/* Fake Store API doesn't provide delivery time,
                    so this is optional */}
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
                    ${Number(product.price).toFixed(2)}
                  </strong>

                  <Button
                    variant="outline-success"
                    className="add-button"
                    onClick={() => onAdd?.(product)}
                  >
                    ADD
                  </Button>
                </div>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default ProductsGrid;