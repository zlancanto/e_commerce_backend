import {Request, Response} from 'express';
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {validateAndParse} from "../../utils/zod";
import {GetProductSchema} from "../../schemas/product/get.product.schema";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";

export const getProductController = async (req: Request, res: Response) => {
    const id = +req.params.id
    const idValidation = validateAndParse(GetProductSchema, {id}, res)
    if (!idValidation) { return; }

    try {
        const product = await prisma.product.findUniqueOrThrow({
            where: {id},
        });
        res.status(StatusCode.OK).json(product);
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucun Produit avec l'id ${id} n'a été trouvé`
        };
        handlerPrismaException(err, errData)
        console.debug('CreateProductError = ', err);
        res.status(err.statusCode || StatusCode.BAD_REQUEST).json({
            CreateProductError: err
        });
    }
}