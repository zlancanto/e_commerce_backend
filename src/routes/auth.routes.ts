import {Router} from "express";
import {loginController} from "../controllers/auth/login.controller";
import {signupController} from "../controllers/auth/signup.controller";

const authRouter: Router = Router();

authRouter.get('/login', loginController)
authRouter.post('/signup', signupController)

// Exportation
const authRoutes = authRouter;
export default authRoutes;