import {Router} from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import addressRoutes from "./address.routes";
import cartRoutes from "./cart.routes";

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/user', userRoutes);
rootRouter.use('/product', productRoutes);
rootRouter.use('/address', addressRoutes);
rootRouter.use('/cart', cartRoutes);

export default rootRouter;