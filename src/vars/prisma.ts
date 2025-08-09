import {PrismaClient} from "@prisma/client";
import {SignUpSchema} from "../schemas/user/signup.user.schema";
import {CreateProductSchemaPrisma} from "../schemas/product/create.product.schema";
import {UpdateProductSchemaPrisma} from "../schemas/product/update.product.schema";
import {GetProductSchemaPrisma} from "../schemas/product/get.product.schema";
import {DeleteProductSchemaPrisma} from "../schemas/product/delete.product.schema";
import {CreateAddressSchemaPrisma} from "../schemas/address/create.address.schema";
import {GetAddressSchemaPrisma} from "../schemas/address/get.address.schema";
import {DeleteAddressSchemaPrisma} from "../schemas/address/delete.address.schema";
import {UpdateAddressSchemaPrisma} from "../schemas/address/update.address.schema";
import {UpdateUserSchemaPrisma} from "../schemas/user/update.user.schema";

export const prisma = new PrismaClient({
    log: ['info','query'],
    errorFormat: 'pretty'
}).$extends({
    query: {
        user: {
            create({args, query}) {
                args.data = SignUpSchema.parse(args.data);
                return query(args);
            },
            update({args, query}) {
                args.data = UpdateUserSchemaPrisma.parse(args.data);
                return query(args);
            },
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
        },
        address: {
            create({args, query}) {
                args.data = CreateAddressSchemaPrisma.parse(args.data);
                return query(args);
            },
            findUnique({args, query}) {
                args.where =GetAddressSchemaPrisma.parse(args.where)
                return query(args)
            },
            update({args, query}) {
                args.data =UpdateAddressSchemaPrisma.parse(args.data)
                return query(args)
            },
            delete({args, query}) {
                args.where = DeleteAddressSchemaPrisma.parse(args.where);
                return query(args);
            }
        }
    }
})