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
            })

            .get("/tagged/:tag", (req, res, next) => {
                const tag = req.params.tag;
                const sortBy = req.query[sortParamName] as string;
                const firstPostId = parseInt(req.query[nextPostParamName]) || null;
                const pageSize = parseInt(req.query[pageSizeParamName]) || null;

                res.json(postService.postsWithTag(tag, sortBy, firstPostId, pageSize));
            })
            
            .get("/:id", (req, res, next) => {
                const postId = parseInt(req.params.id);

                if(isNaN(postId)){
                    res.sendStatus(404);
                }

                const post = postService.postWithId(postId);

                if(!post){
                    res.sendStatus(404);
                }

                res.json(post);
            })

            .get("/slug/:slug", (req, res, next) => {
                const postSlug = req.params.slug;

                const post = postService.postWithSlug(postSlug);

                if(!post){
                    res.sendStatus(404);
                }

                res.json(post);
            });
    }
}