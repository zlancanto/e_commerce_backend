import {Router} from "express";
import {loginController} from "../controllers/auth/login.controller";
import {signUpController} from "../controllers/auth/signUpController";

const authRouter: Router = Router();

authRouter.get('/login', loginController)
authRouter.post('/signup', signUpController)

// Exportation
const authRoutes = authRouter;
export default authRoutes;