import {Request, Response} from "express";
import {prisma} from "../../vars/prisma";
import {validateAndParse} from "../../utils/zod";
import {GetProductSchema} from "../../schemas/product/get.product.schema";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";

export const deleteProductController = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const idValidation = validateAndParse(GetProductSchema, {id}, res)
    if (!idValidation) { return; }

    try {
        const productDeleted = await prisma.product.delete({
            where: {id}
        });
        res.status(StatusCode.OK).json(productDeleted)
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucun Produit avec l'id ${id} n'a été trouvé pour la suppression`
        };
        handlerPrismaException(err, errData)

        console.debug('DeleteProductError = ', err);
        res.status(err.statusCode || StatusCode.BAD_REQUEST).json({
            DeleteProductError: err
        });
    }
}