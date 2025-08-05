import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";
import {DeleteAddressSchema} from "../../schemas/address/delete.address.schema";

export const deleteAddressController = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const data = validateAndParse(DeleteAddressSchema, {id}, res);
    if (!data) { return; }

    try {
        const addressDeleted = await prisma.address.delete({ where: {id} })
        res.status(StatusCode.OK).json(addressDeleted)
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucune ${err.meta.modelName} avec l'id ${id} n'a été trouvé pour la suppression`
        }
        handlerPrismaException(err, errData)

        console.debug('DeleteAddressError = ', err)
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            DeleteAddressError: err
        })
    }
}