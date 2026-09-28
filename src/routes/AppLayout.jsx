import { Outlet } from "react-router-dom";

import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

import "../styles/AppLayout.css";

const AppLayout = () => {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default AppLayout;