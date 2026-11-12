import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaHome, FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import '../styles/Locationsection.css'

function LocationSection({ show, handleClose, addresses = [], onSelectAddress, onDetectLocation }) {
  const [query, setQuery] = useState('');

  const defaultAddresses = [
    {
      id: 1,
      label: 'Home',
      details: '1-13-391/1 Irrigation Colony, Peer Burhan Nagar, Nanded',
    },
    {
      id: 2,
      label: 'Home',
      details:
        '2nd floor, Tekisky software training, Apposite water tank near by blinkit building Irrigation Colony, Peer Burhan Nagar, Nanded',
    },
  ];

  const savedAddresses = addresses.length ? addresses : defaultAddresses;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="location-modal">
      <Modal.Body className="location-modal-body">
        {/* Header */}
        <div className="location-header">
          <h5 className="location-title">Change Location</h5>
          <span role="button" onClick={handleClose} className="location-close">
            &times;
          </span>
        </div>

        {/* Detect location / search */}
        <div className="location-search-row">
          <button
            type="button"
            className="btn btn-success location-detect-btn"
            onClick={onDetectLocation}
          >
            Detect my location
          </button>

          <span className="location-or">OR</span>

          <div className="location-search-box">
            <FaSearch className="location-search-icon" />
            <input
              type="text"
              className="form-control border-0 shadow-none p-0 location-search-input"
              placeholder="search delivery location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Saved addresses */}
        <div className="location-saved-label">Your saved addresses</div>

        <div className="location-address-list">
          {savedAddresses.map((address) => (
            <div
              key={address.id}
              className="location-address-card"
              role="button"
              onClick={() => onSelectAddress && onSelectAddress(address)}
            >
              <div className="location-address-icon">
                <FaHome color="#d97706" />
              </div>

              <div className="location-address-body">
                <div className="location-address-label">{address.label}</div>
                <div className="location-address-text">{address.details}</div>

                <div className="location-address-actions">
                  <span
                    className="location-icon-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaEdit size={11} color="#16a34a" />
                  </span>
                  <span
                    className="location-icon-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaTrashAlt size={11} color="#dc2626" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LocationSection;