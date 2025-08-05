import {RefinementCtx, z} from "zod"

export const CreateAddressSchema = z.object({
    address: z
        .string('Vous devez renseigner une adresse')
        .min(5, 'Au moins 5 caractères')
        .max(50, 'Au plus 50 caractères'),
    complement: z
        .string()
        .max(50, 'Au plus 50 caractères')
        .optional(),
    postalCode: z
        .int('Le code postal doit être un nombre entier')
        .positive('Le code postal doit être un nombre positif')
        .superRefine((value: number, ctx: RefinementCtx<number>) => {
            if (value.toString().length !== 5) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Le code postal doit contenir exactement 5 chiffres."
                })
            }
        }),
    city: z
        .string('Vous devez renseigner une ville')
        .min(2, 'Au moins 2 caractères')
        .max(25, 'Au plus 25 caractères'),
    country: z
        .string('Vous devez renseigner un pays')
        .min(2, 'Au moins 2 caractères')
        .max(25, 'Au plus 25 caractères'),
    userId: z
        .int("L'id doit être un nombre entier")
        .positive("L'id doit être un nombre positif")
})

export const CreateAddressSchemaPrisma = CreateAddressSchema