import {z} from "zod";

export const IncreaseProductQuantityCartSchema = z.object({
    productId: z
        .int("productId doit être un entier valide")
        .positive("productId doit être un entier positif"),
    cartId: z
        .int("cartId doit être un entier valide")
        .positive("cartId doit être un entier positif"),
    quantity: z
        .int("La quantité doit être un entier valide")
        .positive("La quantité doit être un entier positif")
});

export const IncreaseProductQuantityCartSchemaPrisma = IncreaseProductQuantityCartSchema