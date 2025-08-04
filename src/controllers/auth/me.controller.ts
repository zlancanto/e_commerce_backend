import {Request, Response} from "express";
import {StatusCode} from "../../exceptions/enum";

export const meController = (req: Request, res: Response) => {
    try {
        res.status(StatusCode.OK).json(req.user)
    }
    catch (err: any) {
        console.debug('MeError = ', err);
        res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({MeError: err});
    }
}