import mongoose from 'mongoose';

// MONGOOSE CONNECT
const connectDB = (databaseName: string) => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
    .then(() => {
      console.log(`Connected to MongoDB => ${databaseName}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
