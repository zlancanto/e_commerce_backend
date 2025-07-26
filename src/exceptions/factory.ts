import {ErrorCode, StatusCode} from "./enum";
import {CHttpException} from "./CHttp.exception";

export const createHttpException = (
    message: string,
    errorCode: ErrorCode,
    statusCode: StatusCode,
    error?: any
) => {
    return new CHttpException(message, errorCode, statusCode, error || null);
}