import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {GetIdSchema} from "../../schemas/get.id.schema";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";

export const deleteCartController = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const data = validateAndParse(GetIdSchema, {id}, res);
    if (!data) { return; }

    try {
        await prisma.productInCart.deleteMany({
            where: { cartId: id }
        });
        const cartDeleted = await prisma.cart.delete({
            where: {id}
        });

        res.status(StatusCode.OK).json(cartDeleted);
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucun Cart avec l'id ${id} n'a été trouvé`
        };
        handlerPrismaException(err, errData);

        console.debug('DeleteCartError = ', err);
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            DeleteCartError: err
        });
    }
}