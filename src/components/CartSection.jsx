import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../styles/CartSection.css'

function CartSection({ show, handleClose }) {
  const [qty, setQty] = useState(5);

  const itemsTotalMrp = 125;
  const itemsTotal = 105;
  const deliveryCharge = 30;
  const handlingCharge = 5;
  const grandTotal = itemsTotal + deliveryCharge + handlingCharge; // 140
  const totalSavings = itemsTotalMrp - itemsTotal; // 20
  const moreToSave = 44;
  const deliverySaving = 30;

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 0 ? q - 1 : 0));

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
            style={{ fontSize: '1.3rem', cursor: 'pointer' }}
          >
            &#8592;
          </span>
          <span className="fw-bold fs-5">My Cart</span>
        </div>
        <span
          className="text-success fw-semibold d-flex align-items-center gap-1"
          role="button"
          style={{ cursor: 'pointer' }}
        >
          🛒 Share
        </span>
      </div>

      <Offcanvas.Body className="p-3 bg-light">
        {/* Total savings banner */}
        <div className="bg-primary-subtle text-primary fw-semibold d-flex justify-content-between align-items-center rounded p-3 mb-3">
          <span>Your total savings</span>
          <span>₹{totalSavings}</span>
        </div>

        {/* Delivery card */}
        <div className="bg-white rounded p-3 mb-3">
          <div className="d-flex align-items-center gap-2 mb-3">
            <div
              className="d-flex align-items-center justify-content-center rounded"
              style={{ width: 36, height: 36, background: '#f0f0f0', fontSize: '1.2rem' }}
            >
              ⏱️
            </div>
            <div>
              <div className="fw-bold">Delivery in 8 minutes</div>
              <small className="text-muted">Shipment of 5 items</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <img
              src="/images/lays-magic-masala.png"
              alt="Lay's India's Magic Masala Potato Chips"
              style={{ width: 48, height: 48, objectFit: 'contain' }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>
                Lay's India's Magic Masala Potato Chips
              </div>
              <small className="text-muted">58 g</small>
              <div>
                <span className="fw-bold">₹21</span>{' '}
                <span className="text-muted text-decoration-line-through" style={{ fontSize: '0.85rem' }}>
                  ₹25
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center bg-success rounded text-white">
              <button
                className="btn btn-success btn-sm border-0"
                onClick={decrement}
              >
                −
              </button>
              <span className="px-2">{qty}</span>
              <button
                className="btn btn-success btn-sm border-0"
                onClick={increment}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Bill details */}
        <div className="bg-white rounded p-3 mb-3">
          <div className="fw-bold mb-2">Bill details</div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>
              📄 Items total{' '}
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
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>👜 Handling charge ⓘ</span>
            <span>₹{handlingCharge}</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center fw-bold">
            <span>Grand total ⓘ</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        {/* Savings + upsell banner */}
        <div className="bg-primary-subtle text-primary rounded p-3 mb-3">
          <div className="d-flex justify-content-between fw-semibold mb-1">
            <span>Your total savings</span>
            <span>₹{totalSavings}</span>
          </div>
          <small>
            Shop for ₹{moreToSave} more to save ₹{deliverySaving} on delivery charge
          </small>
        </div>

        {/* Donation */}
        <div className="bg-white rounded p-3 d-flex align-items-start gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{ width: 36, height: 36, background: '#fde8e8', fontSize: '1.1rem' }}
          >
            🍰
          </div>
          <div className="flex-grow-1">
            <div className="fw-bold">Feeding India donation</div>
            <small className="text-muted">
              Working towards a malnutrition free India. Feeding India... read more
            </small>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span>₹1</span>
            <input type="checkbox" defaultChecked style={{ width: 18, height: 18 }} />
          </div>
        </div>
      </Offcanvas.Body>

      {/* Proceed button */}
      <div className="p-3 border-top bg-white">
        <button
          className="btn btn-success w-100 d-flex justify-content-between align-items-center px-3 py-2"
          style={{ fontSize: '1rem' }}
        >
          <span>
            ₹{grandTotal}
            <br />
            <small style={{ fontSize: '0.7rem' }}>TOTAL</small>
          </span>
          <span className="fw-bold">Proceed &gt;</span>
        </button>
      </div>
    </Offcanvas>
  );
}

export default CartSection;