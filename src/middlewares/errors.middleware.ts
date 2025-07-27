import {Request, Response, NextFunction} from "express";
import {CHttpException} from "../exceptions/CHttp.exception";

export const errorsMiddleware = (error: CHttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        error: error.error
    });
    next();
}