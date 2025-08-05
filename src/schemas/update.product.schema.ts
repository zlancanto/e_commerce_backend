import {z} from 'zod';
import {CreateProductSchema, CreateProductSchemaPrisma} from "./create.product.schema";

export const UpdateProductSchema = CreateProductSchema.extend({
    name: CreateProductSchema.shape.name.optional(),
    price: CreateProductSchema.shape.price.optional(),
    tags: CreateProductSchema.shape.tags.optional(),
    id: z.preprocess(
        (a: unknown) => {
            if (typeof a === 'number') { return a; }
            else { return 'invalid'; }
        },
        z.number("L'id doit être un entier valide")
            .positive("L'id doit être un entier positif"),
    )
});

export const UpdateProductSchemaPrisma = CreateProductSchemaPrisma.extend({
    name: CreateProductSchema.shape.name.optional(),
    price: CreateProductSchema.shape.price.optional(),
    tags: CreateProductSchema.shape.tags.optional()
});