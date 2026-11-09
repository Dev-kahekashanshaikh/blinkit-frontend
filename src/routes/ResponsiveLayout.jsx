import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppLayout from "./AppLayout";
import HomeLayout from "./HomeLayout";

const ResponsiveLayout = () => {

    const location = useLocation();

    const [isMobile, setIsMobile] = useState(
        window.matchMedia("(max-width: 768px)").matches
    );

    useEffect(() => {

        const mediaQuery = window.matchMedia(
            "(max-width: 768px)"
        );

        const handleResize = (event) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };

    }, []);

    const isHomePage = location.pathname === "/";

    if (isMobile && isHomePage) {
        return <HomeLayout />;
    }

    return <AppLayout />;
};

export default ResponsiveLayout;