import axios from "axios";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL as string;

export async function signInRequestToAuthService(message: any) {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/sign-in`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Auth Service:", error);
        return { success: false, error: "Auth Service unavailable" };
    }
}

export async function signUpRequestToAuthService(message: any) {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/sign-up`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}

export async function otpVerificationRequestToAuthService(message: any) {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/verify`, message);
        return response.data;
    } catch (error) {
        console.error("[API Gateway] Failed to reach Chat Service:", error);
        return { success: false, error: "Chat Service unavailable" };
    }
}