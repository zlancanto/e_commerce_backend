import {Router} from "express";
import {loginController} from "../controllers/auth/login.controller";
import {signUpController} from "../controllers/auth/signUp.controller";
import {meController} from "../controllers/auth/me.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const authRouter: Router = Router();

authRouter.get('/login', loginController);
authRouter.post('/signup', signUpController);
authRouter.get('/me', [authMiddleware], meController)

// Exportation
const authRoutes = authRouter;
export default authRoutes;