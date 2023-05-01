import express, { Request, Response, NextFunction } from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import { connector } from "./db/db";

const app = express();

app.use(cors())

// Returns middleware that only parses urlencoded bodies. 
// This parser accepts only UTF-8 encoding of the body and 
// supports automatic inflation of gzip and deflate encodings.
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Returns middleware th

connector();
// app.use('/', (req: express.Request, res: express.Response) => {
//     res.status(200).json({ message: "Hello World!" })
// });

app.use('/iceberg', routes);// This means all route path preceed this path
export { app };