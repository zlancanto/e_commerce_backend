import {Request, Response, NextFunction} from "express";
import {prisma} from "../../vars/prisma";
import {compare} from "bcrypt";
import * as jwt from "jsonwebtoken";
import {JWT_SECRET, MAX_AGE} from "../../vars/jwt";
import {ErrorCode, StatusCode} from "../../exceptions/enum";
import {createHttpException} from "../../exceptions/factory";
import {CHttpException} from "../../exceptions/CHttp.exception";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });

        if (!user) {
            throw createHttpException("Utilisateur inconnu", ErrorCode.USER_NOT_FOUND, StatusCode.NOT_FOUND);
        }
        if (!(await compare(password, user.password))) {
            throw createHttpException("Mot de passe incorrect", ErrorCode.INCORRECT_PASSWORD, StatusCode.UNAUTHORIZED);
        }
        if (!JWT_SECRET) {
            throw createHttpException("JWT_SECRET non défini dans les variables d'environnement", ErrorCode.ENV_VARIABLE_NOT_DEFINED, StatusCode.INTERNAL_SERVER_ERROR);
        }

        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: MAX_AGE});
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: MAX_AGE,
            secure: true,
            sameSite: 'strict'
        })

        const {password: removed, ...userWithoutPassword} = user;
        res.status(StatusCode.OK).json(userWithoutPassword);
    } catch (err: any) {
        console.debug('LoginError = ', err);
        if (err instanceof CHttpException) {
            next(err);
        }
        else {
            res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({LoginError: err});
        }
    }
}