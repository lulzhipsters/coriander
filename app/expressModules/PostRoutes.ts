import * as express from "express";
import Router = express.Router;

import IPostService from "../services/IPostService";

export default class PostRoutes {
    static build(postService: IPostService): Router{
        const sortParamName = "sort";
        const nextPostParamName = "next";
        const pageSizeParamName = "limit"
        
        return Router()
            .get("/all", (req, res, next) => {
                const sortBy = req.query[sortParamName] as string;
                const firstPostId = parseInt(req.query[nextPostParamName]) || null;
                const pageSize = parseInt(req.query[pageSizeParamName]) || null;

                res.json(postService.allPosts(sortBy, firstPostId, pageSize));
            });
    }
}