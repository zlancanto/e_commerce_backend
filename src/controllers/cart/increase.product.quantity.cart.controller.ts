import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {IncreaseProductQuantityCartSchema} from "../../schemas/cart/increase.product.quantity.cart.schema";

export const increaseProductQuantityCartController = async (req: Request, res: Response) => {
    const data = validateAndParse(IncreaseProductQuantityCartSchema, req.body, res);
    if (!data) { return; }

    try {
        const productInCart = await prisma.productInCart.update({
            where: {
                productId_cartId: {
                    productId: data.productId,
                    cartId: data.cartId
                }
            },
            data: {
                quantity: {
                    increment: data.quantity
                }
            }
        });

        res.status(StatusCode.OK).json(productInCart);
    }
    catch (err: any) {
        console.debug('IncreaseProductQuantityCartError = ', err);
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            IncreaseProductQuantityCartError: err
        });
    }
}