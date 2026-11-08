
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthModalContext = createContext(null);

const API_URL = "http://localhost:4000/api/auth";

// All requests use cookies automatically through credentials: include.
const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong. Please try again."
    );
  }

  return data;
};

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [screen, setScreen] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [user, setUser] = useState(null);


  const isAuthenticated = Boolean(user);

  const [successType, setSuccessType] = useState("");
const [loginSuccess, setLoginSuccess] = useState(false);


  // Open authentication modal
  const openAuthModal = () => {
    setScreen("login");
    setName("");
    setEmail("");
    setPassword("");
    setOtp("");
    setError("");
    setMessage("");
    setIsAuthModalOpen(true);
  };

  // Close modal
  const closeAuthModal = () => {
    if (loading) return;

    setIsAuthModalOpen(false);
    setError("");
    setMessage("");
  };

  // Switch between login and signup
  const switchScreen = (nextScreen) => {
    if (loading) return;

    setScreen(nextScreen);
    setPassword("");
    setOtp("");
    setError("");
    setMessage("");
  };

  // Input handlers
  const handleNameChange = (value) => {
    setName(value);
    setError("");
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setError("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setError("");
  };

  const handleOtpChange = (value) => {
    setOtp(value.replace(/\D/g, "").slice(0, 6));
    setError("");
  };

  // SIGNUP
  const signup = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest("/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      setScreen("otp");
      setOtp("");
      setMessage(
        data.message || "OTP sent to your email address."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


//=====================================================
//   const signup = async (event) => {
//   event.preventDefault();

//   setError("");
//   setMessage("");
//   setLoading(true);

//   try {
//     const data = await apiRequest("/signup", {
//       method: "POST",
//       body: JSON.stringify({
//         name,
//         email,
//         password,
//       }),
//     });

//     if (!data.user) {
//       throw new Error("User details were not returned by server.");
//     }

//     // Automatically log in after successful signup.
//     setUser(data.user);
//     setName(data.user.name || "");
//     setEmail(data.user.email || "");
//     setPassword("");
//     setOtp("");

//     setIsAuthModalOpen(false);
//     setScreen("login");

//     // Show signup success popup.
//     setLoginSuccess(true);
//     setSuccessType("signup");

//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };











  // VERIFY EMAIL OTP
  // const verifyEmail = async (event) => {
  //   event.preventDefault();

  //   setError("");
  //   setMessage("");
  //   setLoading(true);

  //   try {
  //     const data = await apiRequest("/verify-email", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email,
  //         otp,
  //       }),
  //     });

  //     setScreen("login");
  //     setPassword("");
  //     setOtp("");

  //     setMessage(
  //       data.message ||
  //       "Email verified successfully. Please log in."
  //     );
      
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

// VERIFY EMAIL OTP AND AUTO LOGIN
const verifyEmail = async (event) => {
  event.preventDefault();

  setError("");
  setMessage("");
  setLoading(true);

  try {
    const data = await apiRequest("/verify-email", {
      method: "POST",
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    if (!data.user) {
      throw new Error(
        "Email verified, but automatic login failed."
      );
    }

    // Save authenticated user
    setUser(data.user);

    setName(data.user.name || "");
    setEmail(data.user.email || "");

    // Clear sensitive fields
    setPassword("");
    setOtp("");

    // Show signup success popup
    setSuccessType("signup");
    setLoginSuccess(true);

    // Close authentication modal
    setIsAuthModalOpen(false);
    setScreen("login");

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};



  // LOGIN
  const login = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!data.user) {
        throw new Error("User details were not returned by server.");
      }

      // JWT is in the HttpOnly cookie.
      // We only keep safe user details in React state.
      setUser(data.user);

      setIsAuthModalOpen(false);
      setScreen("login");
      setName(data.user.name);
      setEmail(data.user.email);
      setLoginSuccess(true);
      setSuccessType("login");
      setPassword("");
      setOtp("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CHECK EXISTING LOGIN SESSION
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await apiRequest("/me", {
          method: "GET",
        });

        if (data.user) {
          setUser(data.user);
          setName(data.user.name);
          setEmail(data.user.email);
          setAddress(data.user.address);
        }
      } catch {
        setUser(null);
      }
    };

    checkSession();
  }, []);

  // LOGOUT
  const logout = async () => {
    try {
      await apiRequest("/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setIsAuthModalOpen(false);
      setScreen("login");
      setName("");
      setEmail("");
      setPassword("");
      setOtp("");
      setError("");
      setMessage("");
    }
  };

  // Escape key and background scroll handling
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


  const forgotPassword = async (email) => {
  return await apiRequest("/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

const resetPassword = async (token, newPassword) => {
  return await apiRequest("/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });
};
  const value = {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,

    screen,
    name,
    email,
    password,
    otp,

    loading,
    error,
    message,

    user,
    isAuthenticated,
    loginSuccess,
setLoginSuccess,
successType,
setSuccessType,

    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleOtpChange,

    signup,
    login,
    verifyEmail,
    switchScreen,
    logout,
    forgotPassword,
    resetPassword,
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
