import { Router} from "express";
import { deleteUrl, getUrls, openShortUrl, postUrls } from "../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", postUrls);
urlsRouter.get("/urls/:id", getUrls);
urlsRouter.get("/urls/open/:shortUrl", openShortUrl);
urlsRouter.get("/urls/:id", deleteUrl);

export { urlsRouter };