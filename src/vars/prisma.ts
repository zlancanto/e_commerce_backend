import {PrismaClient} from "@prisma/client";
import {SignUpSchema} from "../schemas/user.schema";
import {CreateProductSchemaPrisma} from "../schemas/create.product.schema";
import {UpdateProductSchemaPrisma} from "../schemas/update.product.schema";
import {GetProductSchemaPrisma} from "../schemas/get.product.schema";
import {DeleteProductSchemaPrisma} from "../schemas/delete.product.schema";

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
        },
        product: {
            create({args, query}) {
                args.data = CreateProductSchemaPrisma.parse(args.data);
                return query(args);
            },
            findUnique({args, query}) {
                args.where =GetProductSchemaPrisma.parse(args.where)
                return query(args)
            },
            update({args, query}) {
                args.data = UpdateProductSchemaPrisma.parse(args.data);
                return query(args);
            },
            delete({args, query}) {
                args.where = DeleteProductSchemaPrisma.parse(args.where);
                return query(args);
            }
        }
    }
})