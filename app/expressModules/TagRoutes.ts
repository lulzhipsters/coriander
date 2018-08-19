import * as express from "express";
import Router = express.Router;

import ITagService from "../services/ITagService";

export default class TagRoutes {
    static build(tagService: ITagService): Router{
        return Router()
            .get("/all", (req, res, next) => {
                res.json(tagService.getAllTags());
            });
    }
}