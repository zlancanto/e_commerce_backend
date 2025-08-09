import {Router} from "express";
import {updateUserController} from "../controllers/user/update.user.controller";

const userRouter: Router = Router();

userRouter.patch('/update/:id', updateUserController);

// Exportation
const userRoutes = userRouter;
export default userRoutes