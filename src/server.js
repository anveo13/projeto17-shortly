import express from "express";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

/* server.use(ROTAS) */

server.listen(process.env.PORT, () => {
    console.log("Listen on port 4000")
});