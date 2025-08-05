import {Request, Response} from 'express'
import {prisma} from "../../vars/prisma"
import {validateAndParse} from "../../utils/zod";
import {CreateProductSchema} from "../../schemas/product/create.product.schema";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";

export const createProductController = async (req: Request, res: Response) => {
    const data = validateAndParse(CreateProductSchema, req.body, res);
    if (!data) { return; }

    try {
        const product = await prisma.product.create({data})
        res.status(StatusCode.CREATED).json(product)
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {}
        handlerPrismaException(err, errData)
        console.debug('CreateProductError = ', err)
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            CreateProductError: err
        })
    }
}