import {Router} from "express";
import {createProductController} from "../controllers/product/create.product.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {adminMiddleware} from "../middlewares/admin.middleware";

const productRouter: Router = Router()

productRouter.post('/create', [authMiddleware, adminMiddleware], createProductController)
productRouter.patch('/update', [authMiddleware, adminMiddleware], createProductController)
productRouter.delete('/delate', [authMiddleware, adminMiddleware], createProductController)

const productRoutes = productRouter
export default productRoutes