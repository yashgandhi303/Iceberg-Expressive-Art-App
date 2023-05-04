import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


export const test_connector = async () => {
  const mongoServer = await MongoMemoryServer.create();

  mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" })
    .then(() => {
      return console.info('Successfully connected to Database')
    })
    .catch((error) => {
      return console.log(error)
    });

};