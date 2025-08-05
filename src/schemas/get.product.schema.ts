import {z} from 'zod';

export const GetProductSchema = z.object({
    id: z.preprocess(
        (a: unknown) => {
            if (typeof a === 'number') { return a; }
            else { return 'invalid'; }
        },
        z.int("L'id doit être un entier valide")
            .positive("L'id doit être un entier positif"),
    )
});

export const GetProductSchemaPrisma = GetProductSchema;