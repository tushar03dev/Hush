"use client"

import { useState, useEffect } from "react"
import LandingPage from "./pages/LandingPage"
import ChatPage from "./pages/ChatPage"
import { ThemeProvider } from "./components/ThemeProvider"

type Page = "landing" | "chat"

function App() {
    const [currentPage, setCurrentPage] = useState<Page>(() => {
        return window.location.pathname === "/chat" ? "chat" : "landing"
    })

    // Handle navigation
    const navigateTo = (page: Page) => {
        setCurrentPage(page)
        window.history.pushState({ page }, "", page === "landing" ? "/" : "/chat")
    }

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            const page: Page = event.state?.page || "landing"
            setCurrentPage(page)
        }

        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("popstate", handlePopState)
        }
    }, [])

    return (
        <ThemeProvider defaultTheme="dark" attribute="class">
            {currentPage === "landing" ? <LandingPage navigateTo={navigateTo} /> : <ChatPage navigateTo={navigateTo} />}
        </ThemeProvider>
    )
}

export default App
