import { z, ZodSchema } from "zod";
import { Response } from "express";
import { StatusCode } from "../exceptions/enum";

/**
 * Valide les données avec Zod et gère la réponse en cas d'échec.
 * @returns `null` si invalide (et renvoie une réponse), sinon les données validées.
 * @param schema
 * @param data
 * @param res
 * @param statusCode
 */
export const validateAndParse = <T>(
    schema: ZodSchema<T>,
    data: unknown,
    res: Response,
    statusCode?: StatusCode
): T | null => {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        res.status(statusCode || StatusCode.BAD_REQUEST).json({ ValidationError: errors });
        return null;
    }

    return result.data;
}
