import {Router} from "express";
import {createOrderController} from "../controllers/order/create.order.controller";

const orderRouter: Router = Router()

orderRouter.post("/", createOrderController)