import mongoose from "mongoose";
import {config} from 'dotenv';

config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    } catch (error) {
        console.log(`Database Connection Error : ${error}`);
        process.exit(1);
    }
}

export default connectToDatabase;