import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

const connectionDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB successfullly");

    } catch (error) {
        console.log("error connecting to DB:", error.message);
        process.exit(1);

    }
};

const startUp = async () => {
    await connectionDB();

        const PORT = 5000;
        const server = app.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);

        });
};


startUp();