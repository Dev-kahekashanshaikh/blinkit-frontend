import React, { useState } from "react";
import CartSection from "./CartSection";
import AccountSection from './AccountSection'
import LocationSection from "./LocationSection";
import { useCart } from "../context/CartContext";
import { Navbar as BootstrapNavbar, Form } from "react-bootstrap";
import { useAuthModal } from "../context/AuthModalContext";
import MobileHeroSection from '../components/MobileHeroSection';


import { FaMapMarkerAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import "../styles/Navbar.css";

const Navbar = ({ showMobileHero = false }) => {

// Access the authentication modal context
   const { openAuthModal,user,logout,name,address } = useAuthModal();


  const { itemsTotal, numberOfItems } = useCart();

  // Toggle the AccountSection right side
  const [showCart, setShowCart] = useState(false);

  // Toggle the Location container on navbar
  const [showLocation, setShowLocation] = useState(false);


  // Replace these with real cart state (context/redux/props) when wired up
  const cartItemCount = 5;
  const cartTotal = 105;

  console.log("Navbar rendered. User:", user, "Name:", name);
  return (

    <>
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
            <h2 className="location-label">Delivery in 10 minutes</h2>
            <p className="location-text">Select your location</p>
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
         

      {user ?   <AccountSection name={user.name} onLogout={logout}  /> 
      : (
            <button
              type="button"
              className="btn btn-outline-primary blinkit-login-button"
              onClick={() => openAuthModal("login")}
            >
           <span className="login-profile-btn">    Login </span> <span className="mobile-login-profile"><CgProfile /></span>
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

       {/* Show festive section only when requested */}
       {showMobileHero && <MobileHeroSection />}

    </>
  );
};

export default Navbar;