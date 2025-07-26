import {config} from "dotenv";

config({path: '.env'});

export const PORT: string | undefined = process.env.PORT
export const DATABASE_URL: string | undefined = process.env.DATABASE_URL

