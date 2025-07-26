import {CHttpException} from "../exceptions/enum";
import {Request, Response, NextFunction} from "express";

export const errorsMiddleware = (error: CHttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        error: error.error
    });
    next();
}