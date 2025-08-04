import {NextFunction, Request, Response} from "express";
import {ROLE_ADMIN} from "../vars/roles";
import {ErrorCode, StatusCode} from "../exceptions/enum";
import {createHttpException} from "../exceptions/factory";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) {
        res.status(StatusCode.NOT_FOUND).json({
            UserNotFoundError: 'Utilisateur introuvable'
        });
        return;
    }
    if (user.role === ROLE_ADMIN) { next(); }
    else {
        next(createHttpException(
            'Accès interdit pour les utilisateurs ordinaires',
            ErrorCode.UNAUTHORIZED,
            StatusCode.UNAUTHORIZED
        ));
    }
}