import {z} from "zod";

export const DeleteProductFromCartSchema = z.object({
    productId: z
        .int("productId doit être un entier valide")
        .positive("productId doit être un entier positif"),
    cartId: z
        .int("cartId doit être un entier valide")
        .positive("cartId doit être un entier positif")
});

export const DeleteProductFromCartSchemaPrisma = DeleteProductFromCartSchema