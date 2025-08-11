import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {DeleteProductFromCartSchema} from "../../schemas/cart/delete.product.from.cart.schema";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";

export const deleteProductFromCartController = async (req: Request, res: Response) => {
    const data = validateAndParse(DeleteProductFromCartSchema, req.body, res);
    if (!data) { return; }

    try {
        const productInCartDeleted = await prisma.productInCart.delete({
            where: {
                productId_cartId: {
                    productId: data.productId,
                    cartId: data.cartId
                }
            }
        });

        res.status(StatusCode.OK).json(productInCartDeleted);
    }
    catch (err: any) {
        console.debug('DeleteProductFromCartError = ', err);
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            DeleteProductFromCartError: err
        });
    }
}