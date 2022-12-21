import { Router} from "express";
import { getUrls, postUrls } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postUrls);
urlsRouter.get("/urls/:id", getUrls);

export { urlsRouter };