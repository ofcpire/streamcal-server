import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
const isDBSecured = process.env.IS_DB_SECURED;
const dbId = process.env.DB_ID;
const dbPw = process.env.DB_PW;
const dbAddress = process.env.DB_ADDRESS;
const dbPort = process.env.DB_PORT;
const logger = new Logger('connectDB');

// MONGOOSE CONNECT
const connectDB = (databaseName: string) => {
  const dbConnectString =
    isDBSecured === 'true'
      ? `mongodb://${dbId}:${dbPw}@${dbAddress}:${dbPort}/${databaseName}`
      : `mongodb://${dbAddress}:${dbPort}/${databaseName}`;
  logger.log(`Connect to ${dbConnectString}`);
  mongoose
    .connect(dbConnectString)
    .then(() => {
      logger.log(`Connected to MongoDB => ${databaseName}`);
    })
    .catch((err) => {
      logger.log(err);
    });
};

export default connectDB;
