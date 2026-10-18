
import { useAuthModal } from "../context/AuthModalContext";
import "../styles/AuthModal.css";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    screen,
    mobile,
    otp,
    loading,
    error,
    message,
    handleMobileChange,
    handleOtpChange,
    requestOtp,
    verifyOtp,
    resendOtp,
    goBackToMobile,
  } = useAuthModal();

  if (!isAuthModalOpen) return null;

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget &&
      !loading
    ) {
      closeAuthModal();
    }
  };

  return (
    <div
      className="auth-overlay"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-heading"
      >
        <button
          type="button"
          className="auth-back"
          aria-label={screen === "otp" ? "Go back" : "Close"}
          onClick={screen === "otp" ? goBackToMobile : closeAuthModal}
          disabled={loading}
        >
          ←
        </button>

        <button
          type="button"
          className="auth-close"
          aria-label="Close login"
          onClick={closeAuthModal}
          disabled={loading}
        >
          ×
        </button>

        <div className="auth-content">
          <div className="auth-logo">
            blink<span>it</span>
          </div>

          <h2 id="auth-heading">
            India's last minute app
          </h2>

          {screen === "form" ? (
            <>
              <p className="auth-subtitle">
                Log in or Sign up
              </p>

              <form onSubmit={requestOtp}>
                <div className="auth-phone">
                  <span>+91</span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Enter mobile number"
                    aria-label="Mobile number"
                    value={mobile}
                    onChange={(event) =>
                      handleMobileChange(event.target.value)
                    }
                    maxLength={10}
                    required
                    disabled={loading}
                  />
                </div>

                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading || mobile.length !== 10}
                >
                  {loading ? "Please wait..." : "Continue"}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="auth-subtitle">
                Verify your mobile number
              </p>

              <p className="auth-description">
                Enter the 6-digit OTP sent to +91 {mobile}.
              </p>

              <form onSubmit={verifyOtp}>
                <input
                  className="auth-input auth-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="Enter 6-digit OTP"
                  aria-label="One-time password"
                  value={otp}
                  onChange={(event) =>
                    handleOtpChange(event.target.value)
                  }
                  maxLength={6}
                  required
                  disabled={loading}
                />

                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}

                {message && (
                  <p className="auth-success" role="status">
                    {message}
                  </p>
                )}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>
              </form>

              <button
                className="auth-resend"
                type="button"
                onClick={resendOtp}
                disabled={loading}
              >
                Resend OTP
              </button>
            </>
          )}
        </div>

        <footer className="auth-footer">
          By continuing, you agree to our{" "}
          <a href="/terms">Terms of service</a>
          {" & "}
          <a href="/privacy">Privacy policy</a>
        </footer>
      </section>
    </div>
  );
}
