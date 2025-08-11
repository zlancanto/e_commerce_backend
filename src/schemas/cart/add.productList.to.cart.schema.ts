import {z} from "zod"

export const AddProductListToCartSchema = z.object({
    userId: z
        .int("userId doit être un entier valide")
        .positive("userId doit être un entier positif"),
    productList: z.array(
        z.object({
            productId: z
                .int("productId doit être un entier valide")
                .positive("productId doit être un entier positif"),
            quantity: z
                .int("La quantité doit être un entier valide")
                .positive("La quantité doit être un entier positif")
        })
    )
})

export const AddProductListToCartSchemaPrisma = AddProductListToCartSchema