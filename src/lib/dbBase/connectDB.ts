import mongoose from 'mongoose';
const isDBSecured = process.env.IS_DB_SECURED;
const dbId = process.env.DB_ID;
const dbPw = process.env.DB_PW;
const dbAddress = process.env.DB_ADDRESS;
const dbPort = process.env.DB_PORT;

// MONGOOSE CONNECT
const connectDB = (databaseName: string) => {
  const dbConnectString =
    isDBSecured === 'true'
      ? `mongodb://${dbId}:${dbPw}@${dbAddress}:${dbPort}/${databaseName}`
      : `mongodb://${dbAddress}:${dbPort}/${databaseName}`;
  console.log(dbConnectString);
  mongoose
    .connect(dbConnectString)
    .then(() => {
      console.log(`Connected to MongoDB => ${databaseName}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
