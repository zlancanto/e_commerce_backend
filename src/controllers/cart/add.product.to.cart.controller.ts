import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {AddProductToCartSchema} from "../../schemas/cart/add.product.to.cart.schema";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";

export const addProductToCartController = async (req: Request, res: Response) => {
    const data = validateAndParse(AddProductToCartSchema, req.body, res);
    if (!data) { return; }

    try {
        /* Récupération du user et des produits concernés */
        const user = await prisma.user.findUniqueOrThrow({
            where: {id: data.userId},
            omit: {password: true}
        });
        const product = await prisma.product.findUniqueOrThrow({
            where: { id: data.productId }
        });

        /* Ajout du produit au panier */
        const cart = await prisma.cart.upsert({
            where: {userId: user.id},
            create: {userId: user.id},
            update: {userId: user.id}
        });
        const productInCart = await prisma.productInCart.upsert({
            where: {
                productId_cartId: {
                    productId: product.id,
                    cartId: cart.id
                }
            },
            update: {
                quantity: {
                    increment: data.quantity
                }
            },
            create: {
                productId: product.id,
                cartId: cart.id,
                quantity: data.quantity
            },
        });

        res.status(StatusCode.OK).json(productInCart);
    }
    catch (err: any) {
        console.debug('AddProductToCartError = ', err);
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            AddProductToCartError: err
        });
    }
}