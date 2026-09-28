import Dropdown from 'react-bootstrap/Dropdown';

function AccountSection({ phoneNumber = '7447267276', onLogout }) {
  const menuItems = [
    { label: 'My Orders', href: '/orders' },
    { label: 'Saved Addresses', href: '/addresses' },
    { label: 'My Prescriptions', href: '/prescriptions' },
    { label: 'E-Gift Cards', href: '/gift-cards' },
    { label: "FAQ's", href: '/faqs' },
    { label: 'Account Privacy', href: '/privacy' },
  ];

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="span"
        role="button"
        bsPrefix="account-toggle"
        className="d-flex align-items-center gap-1 fw-semibold"
        style={{ cursor: 'pointer', fontSize: '1.1rem', color: '#212529' }}
      >
        Account
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="p-4"
        style={{ width: 340, borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
      >
        {/* Header */}
        <div className="mb-3">
          <div className="fw-bold fs-4">My Account</div>
          <div className="text-muted">{phoneNumber}</div>
        </div>

        <hr />

        {/* Links */}
        {menuItems.map((item) => (
          <Dropdown.Item
            key={item.label}
            href={item.href}
            className="px-0 py-2 fw-semibold"
            style={{ color: '#212529' }}
          >
            {item.label}
          </Dropdown.Item>
        ))}

        <Dropdown.Item
          onClick={onLogout}
          className="px-0 py-2 fw-semibold"
          style={{ color: '#212529' }}
        >
          Log Out
        </Dropdown.Item>

        <hr />

        {/* QR code footer */}
        <div className="d-flex align-items-center gap-3">
          <img
            src="/images/blinkit-app-qr.png"
            alt="Scan to download the app"
            style={{ width: 90, height: 90 }}
          />
          <div>
            <div className="fw-bold">Simple way to get groceries</div>
            <div className="fw-bold text-primary">at your doorstep</div>
            <small className="text-muted">
              Scan the QR code and download blinkit app
            </small>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AccountSection;