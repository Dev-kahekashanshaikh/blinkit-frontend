
import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

import "../styles/CartSection.css";
import { useCart } from "../context/CartContext";
import { useAuthModal } from "../context/AuthModalContext";

function CartSection({ show, handleClose }) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    itemsTotalMrp,
    itemsTotal,
    deliveryCharge,
    handlingCharge,
    totalSavings,
    clearCart,
  } = useCart();

  const { openAuthModal, user } = useAuthModal();

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [donationChecked, setDonationChecked] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Reset the success message after 3 seconds.
  useEffect(() => {
    if (!orderSuccess) return;

    const timer = setTimeout(() => {
      setOrderSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderSuccess]);

  // Cart totals
  const hasItems = cartItems.length > 0;

  const donationAmount =
    hasItems && donationChecked ? 1 : 0;

  const isFreeDelivery =
    hasItems && itemsTotal > 200;

  const finalDeliveryCharge = hasItems
    ? isFreeDelivery
      ? 0
      : deliveryCharge
    : 0;

  const finalHandlingCharge = hasItems
    ? handlingCharge
    : 0;

  const finalGrandTotal =
    itemsTotal +
    finalDeliveryCharge +
    finalHandlingCharge +
    donationAmount;

  // Place order
  const handlePlaceOrder = async () => {
    // If user is not logged in, open the login modal.
    // if (!user) {
    // return  openAuthModal();
          
    // }

    if (!user) {
  handleClose();
  openAuthModal();
  return;
}

    if (!hasItems) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setIsPlacingOrder(true);

      // Send product IDs and quantities.
      // The backend should calculate prices and totals
      // using product data from the database.
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        weight: item.weight || "",
      }));

     const response = await fetch(`${API_URL}/orders/mail`, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: {
      name: user.name,
      email: user.email,
    },

    orderItems: cartItems.map((item) => ({
      productName: item.name,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    })),

    itemsTotal,
    finalDeliveryCharge,
    handlingCharge,
    donationAmount,
    finalGrandTotal,
  }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Order failed");
}

  

      // Clear cart only after backend confirms success.
      clearCart();

      // Reset donation checkbox for the next order.
      setDonationChecked(true);

      setOrderSuccess(true);
    } catch (error) {
      console.error("Order submission failed:", error);

      alert(
        error.message ||
          "Unable to place your order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: 400 }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <span
            role="button"
            onClick={handleClose}
            style={{
              fontSize: "1.3rem",
              cursor: "pointer",
            }}
          >
            &#8592;
          </span>

          <span className="fw-bold fs-5">
            My Cart
          </span>
        </div>

        <span
          className="text-success fw-semibold d-flex align-items-center gap-1"
          role="button"
          style={{ cursor: "pointer" }}
        >
          🛒 Share
        </span>
      </div>

      <Offcanvas.Body className="p-3 bg-light">

        {/* Order success message */}
        {orderSuccess && (
          <div
            className="alert alert-success shadow d-flex flex-column align-items-center gap-2"
            role="status"
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10000,
              width: "max-content",
              maxWidth: "90%",
              margin: 0,
              padding: "16px 20px",
            }}
          >
            <strong>
              ✓ Order placed successfully!
            </strong>

            <Link
              to="/product"
              className="btn btn-success btn-sm"
              onClick={() => {
                setOrderSuccess(false);
                handleClose();
              }}
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Total savings */}
        <div className="bg-primary-subtle text-primary fw-semibold d-flex justify-content-between align-items-center rounded p-3 mb-3">
          <span>Your total savings</span>
          <span>₹{totalSavings}</span>
        </div>

        {/* Delivery card */}
        <div className="bg-white rounded p-3 mb-3">

          <div className="d-flex align-items-center gap-2 mb-3">
            <div
              className="d-flex align-items-center justify-content-center rounded"
              style={{
                width: 36,
                height: 36,
                background: "#f0f0f0",
                fontSize: "1.2rem",
              }}
            >
              ⏱️
            </div>

            <div>
              <div className="fw-bold">
                Delivery in 8 minutes
              </div>

              <small className="text-muted">
                Shipment of{" "}
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}{" "}
                items
              </small>
            </div>
          </div>

          {/* Cart products */}
          {cartItems.length === 0 ? (
            <div className="text-center text-muted py-5">
              <div
                className="mb-2"
                style={{ fontSize: "2rem" }}
              >
                🛒
              </div>

              <p>Your cart is empty</p>

              <Link
                to="/"
                className="btn btn-success btn-sm"
                onClick={handleClose}
              >
                Continue Shopping →
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                className="d-flex align-items-center gap-2 mb-3"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "contain",
                  }}
                />

                <div className="flex-grow-1">
                  <div
                    className="fw-semibold"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {item.title}
                  </div>

                  <small className="text-muted">
                    {item.weight || ""}
                  </small>

                  <div>
                    <span className="fw-bold">
                      ₹{item.price}
                    </span>

                    {item.mrp && (
                      <span
                        className="text-muted text-decoration-line-through ms-1"
                        style={{ fontSize: "0.85rem" }}
                      >
                        ₹{item.mrp}
                      </span>
                    )}
                  </div>
                </div>

                <div className="d-flex align-items-center bg-success rounded text-white">
                  <button
                    className="btn btn-success btn-sm border-0"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span className="px-2">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-success btn-sm border-0"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill details */}
        <div className="bg-white rounded p-3 mb-3">

          <div className="fw-bold mb-2">
            Bill details
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>
              📄 Items total{" "}

              <span className="badge bg-primary-subtle text-primary ms-1">
                Saved ₹{totalSavings}
              </span>
            </span>

            <span>
              <span className="text-muted text-decoration-line-through me-1">
                ₹{itemsTotalMrp}
              </span>

              ₹{itemsTotal}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>🚴 Delivery charge ⓘ</span>

            <span>
              {isFreeDelivery ? (
                <span className="text-success">
                  FREE
                </span>
              ) : (
                `₹${finalDeliveryCharge}`
              )}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>👜 Handling charge ⓘ</span>
            <span>₹{finalHandlingCharge}</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center fw-bold">
            <span>Grand total ⓘ</span>
            <span>₹{finalGrandTotal}</span>
          </div>
        </div>

        {/* Free delivery banner */}
        {hasItems && (
          itemsTotal <= 200 ? (
            <div className="bg-primary-subtle text-primary rounded p-3 mb-3">
              <div className="d-flex justify-content-between fw-semibold mb-1">
                <span>Your total savings</span>
                <span>₹{totalSavings}</span>
              </div>

              <small>
                Shop for ₹
                {Math.max(0, 201 - itemsTotal)} more
                to get FREE delivery!
              </small>
            </div>
          ) : (
            <div className="bg-success-subtle text-success rounded p-3 mb-3">
              <div className="fw-semibold">
                🎉 Congratulations! You've unlocked
                FREE delivery.
              </div>
            </div>
          )
        )}

        {/* Donation */}
        <div className="bg-white rounded p-3 d-flex align-items-start gap-2">

          <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{
              width: 36,
              height: 36,
              background: "#fde8e8",
              fontSize: "1.1rem",
            }}
          >
            🍰
          </div>

          <div className="flex-grow-1">
            <div className="fw-bold">
              Feeding India donation
            </div>

            <small className="text-muted">
              Working towards a malnutrition free India.
              Feeding India... read more
            </small>
          </div>

          <div className="d-flex align-items-center gap-1">
            <span>₹1</span>

            <input
              type="checkbox"
              style={{
                width: 18,
                height: 18,
              }}
              checked={donationChecked}
              onChange={() =>
                setDonationChecked(!donationChecked)
              }
            />
          </div>
        </div>

      </Offcanvas.Body>

      {/* Proceed button */}
      <div className="p-3 border-top bg-white">
        <button
          type="button"
          className="btn btn-success w-100 d-flex justify-content-between align-items-center px-3 py-2"
          style={{ fontSize: "1rem" }}
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder || !hasItems}
        >
          <span>
            ₹{finalGrandTotal}
            <br />
            <small style={{ fontSize: "0.7rem" }}>
              TOTAL
            </small>
          </span>

          <span className="fw-bold">
            {isPlacingOrder
              ? "Placing order..."
              : user
                ? "Proceed >"
                : "Login to Proceed"}
          </span>
        </button>
      </div>

    </Offcanvas>
  );
}

export default CartSection;
