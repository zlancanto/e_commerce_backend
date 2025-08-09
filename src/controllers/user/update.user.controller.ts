import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {UpdateUserSchema} from "../../schemas/user/update.user.schema";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";

export const updateUserController = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const data = validateAndParse(UpdateUserSchema, {id, ...req.body}, res);
    if (!data) { return; }

    const {id: _, ...dataWithoutId} = data;

    try {
        const userUpdated = await prisma.user.update({
            where: {id},
            data: dataWithoutId,
            omit: {password: true}
        })

        res.status(StatusCode.OK).json(userUpdated);
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucun User avec l'id ${id} n'a été trouvé pour la mise à jour`
        }
        handlerPrismaException(err, errData)

        console.debug('UpdateUserError = ', err)
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            UpdateUserError: err
        })
    }
}