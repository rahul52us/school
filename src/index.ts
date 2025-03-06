import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import connectToDatabase from "./db/db";
import importRoutings from "./routes/index";
import errorMiddleware from "./config/errorHandler";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import routes
importRoutings(app);
app.use(errorMiddleware);

// Connect to Database
connectToDatabase();

// Start Server
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
