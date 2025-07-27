import {PrismaClient} from "@prisma/client";
import {SignUpSchema} from "../schemas/user.schema";

export const prisma = new PrismaClient({
    log: ['info','query'],
    errorFormat: 'pretty'
}).$extends({
    query: {
        user: {
            create({args, query}) {
                args.data = SignUpSchema.parse(args.data);
                return query(args);
            }
        }
    }
})