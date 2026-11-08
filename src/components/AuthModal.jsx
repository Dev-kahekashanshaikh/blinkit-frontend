
import { useAuthModal } from "../context/AuthModalContext";
import "../styles/AuthModal.css";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    screen,
    name,
    email,
    password,
    otp,
    loading,
    error,
    message,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleOtpChange,
    signup,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    switchScreen,
  } = useAuthModal();

  if (!isAuthModalOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !loading) {
      closeAuthModal();
    }
  };

  const isOtpScreen = screen === "otp";
  const isSignupScreen = screen === "signup";

  return (
    <div className="auth-overlay" onMouseDown={handleBackdropClick}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-heading"
      >
        <button
          type="button"
          className="auth-back"
          aria-label="Go back"
          onClick={() =>
            switchScreen(
              screen === "otp" ? "signup" : "login"
            )
          }
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

          {/* EMAIL VERIFICATION */}
          {isOtpScreen && (
            <>
              <p className="auth-subtitle">
                Verify your email address
              </p>

              <p className="auth-description">
                Enter the OTP sent to {email}.
              </p>

              <form onSubmit={verifyEmail}>
                <input
                  className="auth-input auth-otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    handleOtpChange(e.target.value)
                  }
                  disabled={loading}
                />

                {error && (
                  <p className="auth-error">{error}</p>
                )}

                {message && (
                  <p className="auth-success">{message}</p>
                )}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>
            </>
          )}

          {/* FORGOT PASSWORD */}
          {screen === "forgot" && (
            <>
              <p className="auth-subtitle">
                Forgot Password?
              </p>

              <p className="auth-description">
                Enter your email to receive a reset link.
              </p>

              <form onSubmit={forgotPassword}>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    handleEmailChange(e.target.value)
                  }
                  disabled={loading}
                />

                {error && (
                  <p className="auth-error">{error}</p>
                )}

                {message && (
                  <p className="auth-success">{message}</p>
                )}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Send Reset Link"}
                </button>
              </form>

              <button
                className="auth-resend"
                type="button"
                onClick={() => switchScreen("login")}
              >
                Back to Login
              </button>
            </>
          )}

          {/* RESET PASSWORD */}
          {screen === "reset" && (
            <>
              <p className="auth-subtitle">
                Reset Password
              </p>

              <form onSubmit={resetPassword}>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) =>
                    handlePasswordChange(e.target.value)
                  }
                  disabled={loading}
                />

                {error && (
                  <p className="auth-error">{error}</p>
                )}

                {message && (
                  <p className="auth-success">{message}</p>
                )}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Update Password"}
                </button>
              </form>
            </>
          )}

          {/* LOGIN AND SIGNUP */}
          {(screen === "login" || isSignupScreen) && (
            <>
              <p className="auth-subtitle">
                {isSignupScreen
                  ? "Create your account"
                  : "Log in to your account"}
              </p>

              <form onSubmit={isSignupScreen ? signup : login}>
                {isSignupScreen && (
                  <input
                    className="auth-input"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      handleNameChange(e.target.value)
                    }
                    disabled={loading}
                  />
                )}

                <input
                  className="auth-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    handleEmailChange(e.target.value)
                  }
                  disabled={loading}
                />

                <input
                  className="auth-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    handlePasswordChange(e.target.value)
                  }
                  disabled={loading}
                />

                {error && (
                  <p className="auth-error">{error}</p>
                )}

                {message && (
                  <p className="auth-success">{message}</p>
                )}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : isSignupScreen
                      ? "Create Account"
                      : "Login"}
                </button>
              </form>

              {!isSignupScreen && (
                <button
                  className="auth-resend"
                  type="button"
                  onClick={() => switchScreen("forgot")}
                >
                  Forgot Password?
                </button>
              )}

              <button
                className="auth-resend"
                type="button"
                onClick={() =>
                  switchScreen(
                    isSignupScreen ? "login" : "signup"
                  )
                }
                disabled={loading}
              >
                {isSignupScreen
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign up"}
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
