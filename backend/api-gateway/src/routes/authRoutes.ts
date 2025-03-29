import {
    otpVerificationRequestToAuthService,
    signInRequestToAuthService,
    signUpRequestToAuthService
} from "../controllers/authServiceController";
import router from "./chatRoutes";

router.post("/sign-in",signInRequestToAuthService);

router.post("/sign-up",signUpRequestToAuthService);

router.post("/verify",otpVerificationRequestToAuthService);

export default router;