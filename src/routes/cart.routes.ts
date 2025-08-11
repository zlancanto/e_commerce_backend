import {Router} from "express";
import {getCartController} from "../controllers/cart/get.cart.controller";
import {addProductToCartController} from "../controllers/cart/add.product.to.cart.controller";
import {deleteProductFromCartController} from "../controllers/cart/delete.product.from.cart.controller";
import {getAllCartController} from "../controllers/cart/getAll.cart.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {addManyProductToCartController} from "../controllers/cart/addManyProductToCartController";
import {increaseProductQuantityCartController} from "../controllers/cart/increase.product.quantity.cart.controller";
import {decreaseProductQuantityCartController} from "../controllers/cart/decrease.product.quantity.cart.controller";
import {deleteCartController} from "../controllers/cart/delete.cart.controller";

const cartRouter: Router = Router()

cartRouter.post('/addOneProduct', [authMiddleware], addProductToCartController);
cartRouter.post('/addManyProduct', [authMiddleware], addManyProductToCartController);
cartRouter.get('/', [authMiddleware], getAllCartController);
cartRouter.get('/:id', [authMiddleware], getCartController);
cartRouter.patch('/increaseProductQuantity', [authMiddleware], increaseProductQuantityCartController);
cartRouter.patch('/decreaseProductQuantity', [authMiddleware], decreaseProductQuantityCartController);
cartRouter.delete('/deleteOneProduct', [authMiddleware], deleteProductFromCartController);
cartRouter.delete('/:id', [authMiddleware], deleteCartController);

const cartRoutes = cartRouter;
export default cartRoutes