
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthModalContext = createContext(null);

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // form | otp
  const [screen, setScreen] = useState("form");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Authenticated user and their associated data
  const [user, setUser] = useState(null);

  const isAuthenticated = Boolean(user);

  const openAuthModal = () => {
    setScreen("form");
    setMobile("");
    setOtp("");
    setError("");
    setMessage("");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    if (loading) return;

    setIsAuthModalOpen(false);
    setScreen("form");
    setMobile("");
    setOtp("");
    setError("");
    setMessage("");
  };

  const handleMobileChange = (value) => {
    setMobile(value.replace(/\D/g, "").slice(0, 10));
    setError("");
  };

  const handleOtpChange = (value) => {
    setOtp(value.replace(/\D/g, "").slice(0, 6));
    setError("");
  };

  // Request OTP for either a returning or a new user.
  // The backend decides which account flow applies.
  const requestOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to send OTP.");
      }

      setScreen("otp");
      setMessage(
        data.message || "OTP sent. Please check your mobile."
      );
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and retrieve the authenticated user's data.
  const verifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired OTP.");
      }

      // Expected response:
      // { user: { _id, name, mobile, likes, cart, orders } }
      if (!data.user) {
        throw new Error("The server did not return user details.");
      }

      setUser(data.user);
      setMessage("Successfully logged in!");

      setIsAuthModalOpen(false);
      setScreen("form");
      setMobile("");
      setOtp("");
      setError("");
    } catch (err) {
      setError(err.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setError("");
    setMessage("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to resend OTP.");
      }

      setMessage(data.message || "A new OTP has been requested.");
    } catch (err) {
      setError(err.message || "Unable to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  const goBackToMobile = () => {
    if (loading) return;

    setScreen("form");
    setOtp("");
    setError("");
    setMessage("");
  };

  // Close on Escape and lock background scrolling.
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        closeAuthModal();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAuthModalOpen, loading]);

  const logout = async () => {
    if (loading) return;

    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
  };

  const value = {
    isAuthModalOpen,
    setIsAuthModalOpen,
    openAuthModal,
    closeAuthModal,

    screen,
    mobile,
    otp,
    loading,
    error,
    message,

    user,
    setUser,
    isAuthenticated,
    logout,

    handleMobileChange,
    handleOtpChange,
    requestOtp,
    verifyOtp,
    resendOtp,
    goBackToMobile,
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error(
      "useAuthModal must be used within AuthModalProvider"
    );
  }

  return context;
};
