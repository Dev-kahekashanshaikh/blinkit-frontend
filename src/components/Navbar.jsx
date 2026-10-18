import React, { useState } from "react";
import CartSection from "./CartSection";
import AccountSection from "./AccountSection";
import LocationSection from "./LocationSection";
import { useCart } from "../context/CartContext";
import { Navbar as BootstrapNavbar, Form } from "react-bootstrap";
import { useAuthModal } from "../context/AuthModalContext";


import { FaMapMarkerAlt, FaShoppingCart, FaSearch } from "react-icons/fa";

import "../styles/Navbar.css";

const Navbar = () => {

// Access the authentication modal context
   const { openAuthModal,user } = useAuthModal();


  const { itemsTotal, numberOfItems } = useCart();

  // Toggle the AccountSection right side
  const [showCart, setShowCart] = useState(false);

  // Toggle the Location container on navbar
  const [showLocation, setShowLocation] = useState(false);


  // Replace these with real cart state (context/redux/props) when wired up
  const cartItemCount = 5;
  const cartTotal = 105;

  return (
    <BootstrapNavbar className="blinkit-navbar">
      <div className="blinkit-navbar-container">
        {/* =========================
            LOGO
        ========================== */}
        <div className="blinkit-logo-section">
          <BootstrapNavbar.Brand href="/" className="blinkit-logo">
            <b className="logo-name1"> Blink</b>
            <b className="logo-name2">it</b>
          </BootstrapNavbar.Brand>
        </div>

        {/* =========================
            LOCATION
        ========================== */}
        <div className="blinkit-location-section"
          role="button"
          onClick={() => setShowLocation(true)}>
          <FaMapMarkerAlt className="location-icon" />

          <div className="location-content">
            <span className="location-label">Delivery in 10 minutes</span>
            <span className="location-text">Select your location</span>
          </div>
        </div>

        <LocationSection
          show={showLocation}
          handleClose={() => setShowLocation(false)}
          onDetectLocation={() => {
            // your geolocation logic here
            setShowLocation(false);
          }}
          onSelectAddress={(address) => {
            // save the chosen address to your app state here
            setShowLocation(false);
          }}
        />

        {/* =========================
            SEARCH
        ========================== */}
        <div className="blinkit-search-section">
          <Form className="blinkit-search-form">
            <FaSearch className="blinkit-search-icon" />

            <Form.Control
              type="search"
              placeholder="Search for products..."
              className="blinkit-search-input"
            />

          </Form>
        </div>

        {/* =========================
            ACTIONS
        ========================== */}
        <div className="blinkit-actions-section">
         

      {user ?   <AccountSection /> : (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => openAuthModal("login")}
            >
              Login
            </button>
          )  }

          <button
            type="button"
            className="blinkit-cart-button btn btn-success"
            onClick={() => setShowCart(true)}
          >
            <span className="cart-icon">
              <FaShoppingCart />
            </span>
            <span className="cart-text d-flex flex-column align-items-start">
              <span>{numberOfItems} items</span>
              <span>₹{Number(itemsTotal || 0).toFixed(2)}</span>            </span>
          </button>

          <CartSection show={showCart} handleClose={() => setShowCart(false)} />
        </div>
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;