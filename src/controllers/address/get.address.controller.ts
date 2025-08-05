import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";
import {GetAddressSchema} from "../../schemas/address/get.address.schema";

export const getAddressController = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const data = validateAndParse(GetAddressSchema, {id}, res);
    if (!data) { return; }

    try {
        const address = await prisma.address.findUniqueOrThrow({ where: {id} })
        res.status(StatusCode.OK).json(address)
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucune ${err.meta.modelName} avec l'id ${id} n'a été trouvé`
        }
        handlerPrismaException(err, errData)
        console.debug('GetAddressError = ', err)
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            GetAddressError: err
        })
    }
}