import { connect } from "mongoose";

//later add in .env
const mongodb_uri =process.env.MONGODB_URI!;
console.log(mongodb_uri)

const connectDB = async () => {
  try {
    const connection = await connect(mongodb_uri);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

export default connectDB;
