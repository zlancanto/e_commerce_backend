import express, {Express} from 'express';
import {PORT} from "./vars/env";
import rootRouter from "./routes";
import {errorsMiddleware} from "./middlewares/errors.middleware";

const app: Express = express();

app.use(express.json())

// Routes
app.use('/api', rootRouter);

// Error middleware
//app.use(errorsMiddleware)

// Listening
const port = PORT || 9000;
app.listen(port, () => console.info('App connected with port ', port));