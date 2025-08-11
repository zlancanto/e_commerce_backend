import {Request, Response} from "express";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";

export const getAllCartController = async (req: Request, res: Response) => {
    try {
        const cartList = await prisma.cart.findMany();
        res.status(StatusCode.OK).json(cartList)
    }
    catch (err: any) {
        console.debug('GetAllCartError = ', err);
        res.status(err.status || err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
            GetAllCartError: err
        });
    }
}