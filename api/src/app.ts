import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';
import { connector } from "./db/db";
import { test_connector } from "./db/test_db";

const app = express();

app.use(cors())
// Returns middleware that only parses urlencoded bodies. 
// This parser accepts only UTF-8 encoding of the body and 
// supports automatic inflation of gzip and deflate encodings.
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Returns middleware

if (process.env.NODE_ENV !== 'test') {
  connector();
} else {
  test_connector();
}

app.use('/iceberg', routes);

export { app };