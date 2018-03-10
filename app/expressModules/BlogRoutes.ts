import * as express from "express";
import Router = express.Router;

import IPostService from "../services/IPostService";

export default class BlogRoutes {
    static build(postService: IPostService): Router{
        return Router()
            .get("posts/all", (req, res, next) => {
                res.json(postService.allPosts("DateDescending"));
            });
    }
}