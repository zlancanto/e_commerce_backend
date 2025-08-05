import {Request, Response} from "express";
import {validateAndParse} from "../../utils/zod";
import {prisma} from "../../vars/prisma";
import {StatusCode} from "../../exceptions/enum";
import {PrismaExceptionData} from "../../types/prisma/prisma.exception.data";
import {handlerPrismaException} from "../../exceptions/handler.prisma.exception";
import {GetAddressSchema} from "../../schemas/address/get.address.schema";

export const getAllAddressController = async (req: Request, res: Response) => {
    try {
        const addressList = await prisma.address.findMany();
        res.status(StatusCode.OK).json(addressList)
    }
    catch (err: any) {
        console.debug('GetAddressError = ', err)
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
            GetAddressError: err
        })
    }
}