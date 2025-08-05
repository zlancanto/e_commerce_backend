import {z} from 'zod';

export const CreateProductSchemaPrisma = z.object({
    name: z
        .string('Vous devez renseigner un nom de produit')
        .min(2, 'Au moin deux caractères')
        .max(20, 'Au plus 20 caractères'),
    description: z.string().max(1024, 'Au plus 1024 caractères').optional(),
    price: z
        .number('Vous devez renseigner le prix')
        .positive('Le prix doit être un nombre positif'),
    tags: z.string().optional()
});

export const CreateProductSchema = z.object({
    name: z
        .string('Vous devez renseigner un nom de produit')
        .min(2, 'Au moin deux caractères')
        .max(20, 'Au plus 20 caractères'),
    description: z.string().max(1024, 'Au plus 1024 caractères').optional(),
    price: z.preprocess(
        (a: unknown) => {
            if (typeof a === 'number') { return a; }
            else { return 'invalid'; }
        },
        z.number('Le prix doit être un nombre valide')
            .positive('Le prix doit être un nombre positif')
    ),
    tags: z
        .array(z.string())
        .optional()
        .transform((tags: Array<string> | undefined) => (tags ?? []).join(','))
});