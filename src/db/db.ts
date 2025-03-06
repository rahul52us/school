import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
    try {
        const uri: string | undefined = process.env.MONGODB_URI;
        if (!uri) throw new Error("MONGODB_URI is missing in .env file!");

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);

        console.log("✅ Database Connected Successfully!");
    } catch (error: any) {
        console.error("❌ Error connecting to Database:", error.message);
        process.exit(1);
    }
};

export default connectToDatabase;
