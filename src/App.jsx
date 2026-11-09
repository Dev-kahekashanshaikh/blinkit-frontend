import React from "react";
import AppRoutes from './routes/AppRoutes';
import AuthModal from "./components/AuthModal";
import LoginSuccessPopup from "./components/LoginSuccessPopup";


function App() {

  return (
   <>
  
   <AppRoutes  />
   <AuthModal />
    <LoginSuccessPopup />
   </>
  );
}

export default App;