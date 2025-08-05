import {Router} from "express";
import {createProductController} from "../controllers/product/create.product.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {adminMiddleware} from "../middlewares/admin.middleware";
import {updateProductController} from "../controllers/product/update.product.controller";
import {deleteProductController} from "../controllers/product/delete.product.controller";
import {getProductController} from "../controllers/product/get.product.controller";
import {getAllProductController} from "../controllers/product/getAll.product.controller";

const productRouter: Router = Router()

productRouter.post('/create', [authMiddleware, adminMiddleware], createProductController)
productRouter.get('/', [authMiddleware, adminMiddleware], getAllProductController)
productRouter.get('/:id', [authMiddleware, adminMiddleware], getProductController)
productRouter.put('/update/:id', [authMiddleware, adminMiddleware], updateProductController)
productRouter.delete('/delete/:id', [authMiddleware, adminMiddleware], deleteProductController)

const productRoutes = productRouter
export default productRoutes