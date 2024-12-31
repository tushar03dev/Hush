import HomePage from "./MyComponents/HomePage/HomePage.jsx";
import Header from './MyComponents/Header/Header.jsx'
import './App.css'
import LoginPage from "./MyComponents/LoginPage/LoginPage.jsx";


function App() {
    return (
        <>
          <LoginPage/>
          <Header />
            <HomePage />
        </>
    );
}

export default App
