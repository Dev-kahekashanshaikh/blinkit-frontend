import { useEffect } from "react";
import { useAuthModal } from "../context/AuthModalContext";

 function LoginSuccessPopup() {
  const { loginSuccess, setLoginSuccess, user } = useAuthModal();

  useEffect(() => {
    if (!loginSuccess) return;

    const timer = setTimeout(() => {
      setLoginSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [loginSuccess, setLoginSuccess]);

  if (!loginSuccess) return null;

  return (
    <div className="login-success-popup">
      <div className="login-success-icon">✓</div>
      <div>
        <strong>Login Successful!</strong>
        <p>Welcome back, {user?.name || "User"}! Happy shopping 🛍️</p>
      </div>
      <button onClick={() => setLoginSuccess(false)}>×</button>
    </div>
  );
}
export default LoginSuccessPopup;