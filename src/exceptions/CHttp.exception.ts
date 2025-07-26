// Message, status code, error code, error
export class CHttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    error: any

    constructor(
        message: string,
        errorCode: any,
        statusCode: number,
        error: any
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.error = error
    }
}