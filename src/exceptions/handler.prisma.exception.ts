import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError, PrismaClientRustPanicError,
    PrismaClientUnknownRequestError, PrismaClientValidationError
} from "@prisma/client/runtime/library";
import {PrismaExceptionData} from "../types/prisma/prisma.exception.data";

export const handlerPrismaException = (
    err: any,
    data: PrismaExceptionData
) => {
    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2025' :
                err.meta!.cause = data.message
                break;
        }
    }
    else if (err instanceof PrismaClientInitializationError) {}
    else if (err instanceof PrismaClientInitializationError) {}
    else if (err instanceof PrismaClientValidationError) {}
    else if (err instanceof PrismaClientRustPanicError) {}
    else { return; }
}