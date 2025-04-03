"use client"

import { useState, useEffect } from "react"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import ChatPage from "./pages/ChatPage"
import { ThemeProvider } from "./components/ThemeProvider"

type Page = "landing" | "chat" | "login"

function App() {
    const [currentPage, setCurrentPage] = useState<Page>(() => {
        if (window.location.pathname === "/login") return "login";
        if (window.location.pathname === "/chat") return "chat";
        return "landing";
    });

    // Handle navigation
    const navigateTo = (page: Page) => {
        setCurrentPage(page);
        window.history.pushState({ page }, "", page === "landing" ? "/" : `/${page}`);
    };

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            const page: Page = event.state?.page || "landing";
            setCurrentPage(page);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" attribute="class">
            {currentPage === "landing" && <LandingPage navigateTo={navigateTo} />}
            {currentPage === "login" && <LoginPage navigateTo={navigateTo} />}
            {currentPage === "chat" && <ChatPage navigateTo={navigateTo} />}
        </ThemeProvider>
    );
}

export default App;
