import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import { signUpRouter } from "./routes/signUpRouter.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(signUpRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});