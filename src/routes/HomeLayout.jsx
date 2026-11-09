import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
    return (
        <div className="home-layout">

            <Navbar showMobileHero={true} />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

export default HomeLayout;