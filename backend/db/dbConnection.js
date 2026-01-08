import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/e_learning_db");
        console.log("MongoDb Connected");
    } catch (error) {
        console.log(`Database Connection Error : ${error}`);
        process.exit(1);
    }
}

export default connectToDatabase;