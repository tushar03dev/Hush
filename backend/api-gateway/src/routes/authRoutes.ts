import {signInRequestToAuthService, signUpRequestToAuthService} from "../controllers/authController";
import router from "./chatRoutes";

router.post("/sign-in", async (req, res) => {
    try{
        const {email, password} = req.body;

        // Forward the request to the Chat Service
        const response = await signInRequestToAuthService({email, password});

        if (response.success) {
            res.status(200).json({ success: true, message: "Message processed successfully." });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post("/sign-up", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        // Forward the request to the Chat Service
        const response = await signUpRequestToAuthService({name, email, password});

        if (response.success) {
            res.status(200).json({ success: true, message: "Message processed successfully." });
        } else {
            res.status(500).json({ success: false, error: "Failed to send message." });
        }
    } catch (error) {
        console.error("[API Gateway] Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});