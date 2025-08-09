import {Router} from "express";
import {getCartController} from "../controllers/cart/get.cart.controller";
import {addProductToCartController} from "../controllers/cart/add.product.to.cart.controller";
import {changeQuantityCartController} from "../controllers/cart/change.quantity.cart.controller";
import {deleteProductFromCartController} from "../controllers/cart/delete.product.from.cart.controller";
import {getAllCartController} from "../controllers/cart/getAll.cart.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const cartRouter: Router = Router()

cartRouter.post('/', [authMiddleware], addProductToCartController);
cartRouter.get('/', [authMiddleware], getAllCartController);
cartRouter.get('/:id', [authMiddleware], getCartController);
cartRouter.patch('/:id', [authMiddleware], changeQuantityCartController);
cartRouter.delete('/:id', [authMiddleware], deleteProductFromCartController);

const cartRoutes = cartRouter;
export default cartRoutes