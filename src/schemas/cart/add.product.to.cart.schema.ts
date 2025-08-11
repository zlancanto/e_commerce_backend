import {z} from "zod"

export const AddProductToCartSchema = z.object({
    userId: z
        .int("userId doit être un entier valide")
        .positive("userId doit être un entier positif"),
    productId: z
        .int("productId doit être un entier valide")
        .positive("productId doit être un entier positif"),
    quantity: z
        .int("La quantité doit être un entier valide")
        .positive("La quantité doit être un entier positif")
})

export const AddProductToCartSchemaPrisma = AddProductToCartSchema