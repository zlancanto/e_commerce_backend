import {Request, Response, NextFunction} from "express";
import {CHttpException} from "../exceptions/CHttp.exception";
import {StatusCode} from "../exceptions/enum";

export const errorsMiddleware = (error: CHttpException | Error, req: Request, res: Response, next: NextFunction) => {
    // 1. Détermine le code de statut
    const statusCode: number = error instanceof CHttpException ? error.statusCode : StatusCode.INTERNAL_SERVER_ERROR;

    // 2. Détermine le message d'erreur et autres détails
    const message: string = error.message;
    const errorCode: any = error instanceof CHttpException ? error.errorCode : 'SERVER_ERROR';
    const errorDetails: any = error instanceof CHttpException ? error.error : error;

    console.error(`Error: ${message}, Status: ${statusCode}, Code: ${errorCode}`);

    // 3. Envoie la réponse d'erreur
    res.status(statusCode).json({
        message,
        errorCode,
        error: errorDetails
    });
};