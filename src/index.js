import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import { signUpRouter } from "./routes/signUpRouter.js";
import { signInRouter } from "./routes/signInRouter.js";
import { urlsRouter } from "./routes/urlsRouter.js";
import { rankingRouter } from "./routes/rankingRouter.js";
import { usersRouter } from "./routes/usersRoutes.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(signUpRouter, signInRouter, urlsRouter, rankingRouter, usersRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});