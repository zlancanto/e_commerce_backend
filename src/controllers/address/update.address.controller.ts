import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";
import {UpdateAddressSchema} from "../../schemas/address/update.address.schema";

export const updateAddressController = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const data = validateAndParse(UpdateAddressSchema, {id, ...req.body}, res);
    if (!data) { return; }

    const {id: _, ...dataWithoutId} = data;

    try {
        const addressUpdated = await prisma.address.update({
            where: {id},
            data: dataWithoutId
        })
        res.status(StatusCode.OK).json(addressUpdated)
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucune Address avec l'id ${id} n'a été trouvé`
        }
        handlerPrismaException(err, errData)
        console.debug('UpdateAddressError = ', err)
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            UpdateAddressError: err
        })
    }
}