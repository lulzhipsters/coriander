import * as express from "express";
import Router = express.Router;

export default class RouterConfig {
    static configureRouter(): Router{
        let router = Router();

        return router;
    }
}