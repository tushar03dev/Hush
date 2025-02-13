import { Router, Request, Response, NextFunction } from 'express';
import {signUp, signIn} from '../controllers/authController';
import {authenticateToken} from "../middleware/authMiddleware";

const router = Router();

// User sign-up
router.post('/sign-up', (req: Request, res: Response, next: NextFunction) => {
    signUp(req, res, next);
});

router.post('/sign-in', (req: Request, res: Response, next: NextFunction) => {
    signIn(req, res, next);
});

router.get('/validate', (req: Request, res: Response, next: NextFunction) => {
    authenticateToken(req, res, next);
});

export default router;

