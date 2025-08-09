import {CreateAddressSchema} from "./create.address.schema";
import {GetIdSchema, GetIdSchemaPrisma} from "../get.id.schema";

const UpdateAddress = CreateAddressSchema
    .omit({userId: true})
    .partial()

export const UpdateAddressSchema = UpdateAddress.merge(GetIdSchema)
export const UpdateAddressSchemaPrisma = UpdateAddress.merge(GetIdSchemaPrisma)