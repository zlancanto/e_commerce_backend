import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {AddProductListToCartSchema} from "../../schemas/cart/add.productList.to.cart.schema";
import {ProductInCart} from "@prisma/client";

export const addManyProductToCartController = async (req: Request, res: Response) => {
    const data = validateAndParse(AddProductListToCartSchema, req.body, res);
    if (!data) {
        return;
    }

    try {
        /* Récupération du user et des produits concernés */
        const user = await prisma.user.findUniqueOrThrow({
            where: {id: data.userId},
            omit: {password: true}
        });
        let productInCartList: Array<ProductInCart> = [];
        for (const product of data.productList) {
            /* Ajout du produit au panier */
            const cart = await prisma.cart.upsert({
                where: {userId: user.id},
                create: {userId: user.id},
                update: {userId: user.id}
            });
            productInCartList.push(
                await prisma.productInCart.upsert({
                    where: {
                        productId_cartId: {
                            productId: product.productId,
                            cartId: cart.id
                        }
                    },
                    update: {
                        quantity: {
                            increment: product.quantity
                        }
                    },
                    create: {
                        productId: product.productId,
                        cartId: cart.id,
                        quantity: product.quantity
                    },
                })
            )
        }


        res.status(StatusCode.OK).json(productInCartList);
    } catch (err: any) {
        console.debug('AddProductListToCartError = ', err);
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            AddProductListToCartError: err
        });
    }
}