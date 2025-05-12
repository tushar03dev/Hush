import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";

interface LoginPageProps {
    navigateTo: (page: "landing" | "chat" | "login") => void;
}

const LoginPage: React.FC<LoginPageProps> = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    return (
        <div className="min-h-screen bg-black flex justify-center items-center flex-col font-['Montserrat'] py-12">

            <div
                className={`bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[768px] max-w-full min-h-[480px] ${
                    isRightPanelActive ? "right-panel-active" : ""
                }`}
            >
                {/* Sign Up Container */}
                <div
                    className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 opacity-0 z-1 ${
                        isRightPanelActive ? "translate-x-full opacity-100 z-5 animate-show" : ""
                    }`}
                >
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
                        <h1 className="font-bold mb-4">Create Account</h1>
                        <div className="my-5 flex gap-2">
                            <a href="#" className="border border-[#DDDDDD] rounded-full w-10 h-10 flex justify-center items-center">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="border border-[#DDDDDD] rounded-full w-10 h-10 flex justify-center items-center">
                                <FaEnvelope size={20} />
                            </a>
                            <a href="#" className="border border-[#DDDDDD] rounded-full w-10 h-10 flex justify-center items-center">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                        <span className="text-xs mb-4">or use your email for registration</span>
                        <input type="text" placeholder="Name" className="bg-[#eee] border-none p-3 my-2 w-full" />
                        <input type="email" placeholder="Email" className="bg-[#eee] border-none p-3 my-2 w-full" />
                        <input type="password" placeholder="Password" className="bg-[#eee] border-none p-3 my-2 w-full" />
                        <button className="mt-4 rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform duration-80 ease-in hover:opacity-90 active:scale-95 focus:outline-none">
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Sign In Container */}
                <div
                    className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
                        isRightPanelActive ? "translate-x-full" : ""
                    }`}
                >
                    <form className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
                        <h1 className="font-bold mb-4">Sign in</h1>
                        <div className="my-5 flex gap-2">
                            <a href="#" className="border border-[#DDDDDD] rounded-full w-10 h-10 flex justify-center items-center">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="border border-[#DDDDDD] rounded-full w-10 h-10 flex justify-center items-center">
                                <FaEnvelope size={20} />
                            </a>
                            <a href="#" className="border border-[#DDDDDD] rounded-full w-10 h-10 flex justify-center items-center">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                        <span className="text-xs mb-4">or use your account</span>
                        <input type="email" placeholder="Email" className="bg-[#eee] border-none p-3 my-2 w-full" />
                        <input type="password" placeholder="Password" className="bg-[#eee] border-none p-3 my-2 w-full" />
                        <a href="#" className="text-sm text-gray-700 my-4">
                            Forgot your password?
                        </a>
                        <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform duration-80 ease-in hover:opacity-90 active:scale-95 focus:outline-none">
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${
                        isRightPanelActive ? "-translate-x-full" : ""
                    }`}
                >
                    <div
                        className={`bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] bg-no-repeat bg-cover text-white relative -left-full h-full w-[200%] transform ${
                            isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
                        } transition-transform duration-600 ease-in-out`}
                    >
                        {/* Overlay Left */}
                        <div
                            className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 -translate-x-[20%] transition-transform duration-600 ease-in-out ${
                                isRightPanelActive ? "translate-x-0" : ""
                            }`}
                        >
                            <h1 className="font-bold mb-4">Welcome Back!</h1>
                            <p className="text-sm font-light leading-5 tracking-wider mb-8">
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                className="rounded-[20px] border border-white bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform duration-80 ease-in hover:bg-white hover:text-[#FF4B2B] active:scale-95 focus:outline-none"
                                onClick={() => setIsRightPanelActive(false)}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Overlay Right */}
                        <div
                            className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 right-0 transition-transform duration-600 ease-in-out ${
                                isRightPanelActive ? "translate-x-[20%]" : ""
                            }`}
                        >
                            <h1 className="font-bold mb-4">Hello, Friend!</h1>
                            <p className="text-sm font-light leading-5 tracking-wider mb-8">
                                Enter your personal details and start journey with us
                            </p>
                            <button
                                className="rounded-[20px] border border-white bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform duration-80 ease-in hover:bg-white hover:text-[#FF4B2B] active:scale-95 focus:outline-none"
                                onClick={() => setIsRightPanelActive(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;