import {z} from 'zod';
import {GetIdSchema, GetIdSchemaPrisma} from "../get.id.schema";

export const UpdateUserSchema = z.object({
    id: GetIdSchema.shape.id,
    name: z.string().optional()
});

export const UpdateUserSchemaPrisma = UpdateUserSchema.omit({id: true});