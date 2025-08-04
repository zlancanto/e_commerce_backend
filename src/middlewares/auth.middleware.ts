import {NextFunction, Request, Response} from "express";
import {createHttpException} from "../exceptions/factory";
import {ErrorCode, StatusCode} from "../exceptions/enum";
import {JWT_SECRET} from "../vars/jwt";
import {JwtPayload, verify} from "jsonwebtoken";
import {prisma} from "../vars/prisma";

export const authMiddleware = async (req: Request, res:Response, next: NextFunction) => {
    /* 1. Verify that var JWT_SECRET is defined */
    if (!JWT_SECRET) {
        next(createHttpException("La variable d'environnement JWT_SECRET n'est pas définie", ErrorCode.ENV_VARIABLE_NOT_DEFINED, StatusCode.INTERNAL_SERVER_ERROR));
    }

    /* 2. Extract the token from header */
    const token = req.cookies.jwt;

    /* 3. If token is not present, throw an error of unauthorized */
    if (!token) {
        next(createHttpException('Token inconnu', ErrorCode.NOT_TOKEN_EXIST, StatusCode.UNAUTHORIZED));
    }

    try {
        /* 4. If the token is present, verify that token and extract the payload */
        const jwtPayload = verify(token!, JWT_SECRET!) as JwtPayload;

        /* 5. To get the user from the payload */
        const user = await prisma.user.findUnique({
            where: {id: jwtPayload.userId},
            omit: {password: true}
        });
        if (!user) {
            next(createHttpException('Aucun user associé au token', ErrorCode.USER_NOT_FOUND, StatusCode.UNAUTHORIZED));
        }

        /* 6. To attach the user to the current request object */
        req.user = user!
        next()
    }
    catch (err) {
        console.debug('AuthError = ', err);
        next(err)
    }
}