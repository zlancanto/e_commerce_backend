import {Request, Response} from "express";
import {prisma} from "../../vars/prisma";
import {genSalt, hash} from "bcrypt";
import {ErrorCode, StatusCode} from "../../exceptions/enum";
import {createHttpException} from "../../exceptions/factory";
import {SignUpSchema} from "../../schemas/user.schema";
import {validateAndParse} from "../../utils/zod";

export const signUpController = async (req: Request, res: Response) => {
    // Validation Zod
    const data = validateAndParse(SignUpSchema, req.body, res);
    if (!data) { return; }

    const { email, password, name } = data;

    try {
        let user = await prisma.user.findUnique({
            where: {email}
        });

        if (user) {
            throw createHttpException("L'utilisateur existe déjà", ErrorCode.USER_ALREADY_EXISTS, StatusCode.BAD_REQUEST);
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