import {Request, Response} from "express";
import {prisma} from "../../vars/prisma";
import {genSalt, hash} from "bcrypt";
import {ErrorCode, StatusCode} from "../../exceptions/enum";
import {createHttpException} from "../../exceptions/factory";

export const signupController = async (req: Request, res: Response) => {
    const {email, password, name} = req.body;

    try {
        let user = await prisma.user.findUnique({
            where: {email}
        });

        if (user) {
            throw createHttpException("L'utilisateur existe déjà", ErrorCode.USER_ALREADY_EXISTS, StatusCode.BAD_REQUEST);
            //return res.status(409).json({SignUpError : "L'utilisateur existe déjà"});
        }

        user = await prisma.user.create({
            data: {
                name,
                email,
                password: await hash(password, await genSalt())
            }
        });

        res.status(StatusCode.OK).json(user);
    }
    catch (err: any) {
        console.debug('SignUpError = ', err);
        res.status(err.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({SignUpError: err});
    }
}