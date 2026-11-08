
import { useState, useRef, useEffect } from "react";
import "../styles//AccountSection.css";

function AccountSection({ name, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    "My Orders",
    "My Wallet",
    "Saved Addresses",
    "Account Settings",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Close dropdown with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  return (
    <div className="account-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="account-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Account
        <span className={`account-arrow ${isOpen ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="account-menu">
          <div className="account-header">
            <h3>My Account</h3>
            <p>Hello, {name || "User"}</p>
          </div>

          <div className="account-divider" />

          <div className="account-links">
            {menuItems.map((item) => (
              <button
                type="button"
                className="account-menu-item"
                key={item}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              className="account-menu-item logout-item"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>

          <div className="account-divider" />

          <div className="account-footer">
            <img
              src="/images/blinkit-app-qr.png"
              alt="App QR code"
              className="account-qr"
            />

            <div>
              <strong>Get the app</strong>
              <p>Scan to download our app</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSection;
