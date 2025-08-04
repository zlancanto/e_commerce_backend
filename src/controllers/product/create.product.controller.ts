import {Request, Response} from 'express'
import {prisma} from "../../vars/prisma"
import {validateAndParse} from "../../utils/zod";
import {CreateProductSchema} from "../../schemas/product.schema";
import {StatusCode} from "../../exceptions/enum";

export const createProductController = async (req: Request, res: Response) => {
    const data = validateAndParse(CreateProductSchema, req.body, res);
    if (!data) { return; }

    try {
        const product = await prisma.product.create({data})
        res.status(StatusCode.CREATED).json(product)
    }
    catch (err: any) {
        console.debug('CreateProductError = ', err)
        res.status(err.statusCode || StatusCode.BAD_REQUEST).json({
            CreateProductError: err
        })
    }
}