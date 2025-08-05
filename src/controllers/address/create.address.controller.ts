import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {CreateAddressSchema} from "../../schemas/address/create.address.schema";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";

export const createAddressController = async (req: Request, res: Response) => {
    const data = validateAndParse(CreateAddressSchema, req.body, res);
    if (!data) {
        return;
    }

    try {
        /* Soit le user est trouvé, soit une erreur est déclenchée
         * et on s'arrête à ce niveau
         * */
        await prisma.user.findUniqueOrThrow({
            where: {id: data.userId}
        });
        const addressCreated = await prisma.address.create({
            data: {
                ...data,
                userId: req.user!.id
            }
        });
        res.status(StatusCode.CREATED).json(addressCreated);
    } catch (err: any) {
        const errData: PrismaExceptionData = {
            message2002: `Ce User a déjà une adresse`,
            message2025: `Aucun ${err.meta.modelName} avec l'id ${data.userId} n'a été trouvé`
        };
        handlerPrismaException(err, errData);
        console.debug('CreateAddressError = ', err);
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            CreateAddressError: err
        });
    }
}