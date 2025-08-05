import {Request, Response} from 'express'
import {prisma} from "../../vars/prisma"
import {StatusCode} from "../../exceptions/enum";

export const getAllProductController = async (req: Request, res: Response) => {
    try {
        const productList = await prisma.product.findMany()
        res.status(StatusCode.CREATED).json(productList)
    }
    catch (err: any) {
        console.debug('GetAllProductError = ', err)
        res.status(err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
            GetAllProductError: err
        })
    }
}