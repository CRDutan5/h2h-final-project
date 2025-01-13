import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const mongoDbConnection = await connect(process.env.MY_CONNECTION_STRING);
    console.log("Database Connected!", mongoDbConnection.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
