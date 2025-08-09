import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {UpdateProductSchema} from "../../schemas/product/update.product.schema";
import {StatusCode} from "../../exceptions/enum";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";

export const updateProductController = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const data = validateAndParse(UpdateProductSchema, {id, ...req.body}, res);
    if (!data) { return; }

    try {
        const productUpdated = await prisma.product.update({
            where: { id },
            data: req.body
        });
        res.status(StatusCode.OK).json(productUpdated);
    }
    catch (err: any) {
        const errData: PrismaExceptionData = {
            message2025: `Aucun Produit avec l'id ${id} n'a été trouvé pour une mise à jour.`
        }
        handlerPrismaException(err, errData)
        console.debug('UpdateProductError = ', err)
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            UpdateProductError: err
        })
    }
}