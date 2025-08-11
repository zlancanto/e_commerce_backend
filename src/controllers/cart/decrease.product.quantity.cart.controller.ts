import {Request, Response, NextFunction} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {ErrorCode, StatusCode} from "../../exceptions/enum";
import {IncreaseProductQuantityCartSchema} from "../../schemas/cart/increase.product.quantity.cart.schema";
import {createHttpException} from "../../exceptions/factory";
import {CHttpException} from "../../exceptions/CHttp.exception";

export const decreaseProductQuantityCartController = async (req: Request, res: Response, next: NextFunction) => {
    const data = validateAndParse(IncreaseProductQuantityCartSchema, req.body, res);
    if (!data) {
        return;
    }

    try {
        const existingProductInCart = await prisma.productInCart.findUniqueOrThrow({
            where: {
                productId_cartId: {
                    productId: data.productId,
                    cartId: data.cartId
                }
            }
        });

        if (existingProductInCart.quantity - data.quantity < 0) {
            throw createHttpException(
                "La quantité à retrancher ne peut être supérieur à celle existant dans le panier",
                ErrorCode.NOT_NEGATIVE_VALUE,
                StatusCode.BAD_REQUEST
            );
        }

        const productInCart = await prisma.productInCart.update({
            where: {
                productId_cartId: {
                    productId: data.productId,
                    cartId: data.cartId
                }
            },
            data: {
                quantity: {
                    decrement: data.quantity
                }
            }
        });

        res.status(StatusCode.OK).json(productInCart);
    }
    catch (err: any) {
        console.debug('IncreaseProductQuantityCartError = ', err);
        if (err instanceof CHttpException) {
            next(err);
        }
        else {
            res.status(err.status || err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
                IncreaseProductQuantityCartError: err
            });
        }
    }
}