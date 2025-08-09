import {Router} from "express";
import {createAddressController} from "../controllers/address/create.address.controller";
import {getAddressController} from "../controllers/address/get.address.controller";
import {getAllAddressController} from "../controllers/address/getAll.address.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {deleteAddressController} from "../controllers/address/delete.address.controller";
import {updateAddressController} from "../controllers/address/update.address.controller";

const addressRouter: Router = Router();

addressRouter.post('/create', [authMiddleware], createAddressController);
addressRouter.get('/:id', [authMiddleware], getAddressController);
addressRouter.get('/', [authMiddleware], getAllAddressController);
addressRouter.put('/:id', [authMiddleware], updateAddressController);
addressRouter.delete('/:id', [authMiddleware], deleteAddressController);

const addressRoutes: Router = addressRouter;
export default addressRoutes;