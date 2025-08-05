import {z} from 'zod';

export const GetIdSchema = z.object({
    id: z.preprocess(
        (a: unknown) => {
            if (typeof a === 'number') { return a; }
            else { return 'invalid'; }
        },
        z.int("L'id doit être un entier valide")
            .positive("L'id doit être un entier positif"),
    )
});