import * as express from "express";
import * as path from "path";

import PostRoutes from "./expressModules/PostRoutes";
import StaticContent from "./expressModules/StaticContent";

import PostService from "./services/PostService";
import PostRepository from "./data/PostRepository";

//load the config
import config from "./Config";

const dataDirectory = path.isAbsolute(config.dataFolderPath) 
    ? config.dataFolderPath
    : path.join(__dirname, config.dataFolderPath);

const postRepository = new PostRepository(dataDirectory);
const postService = new PostService(postRepository);

let app = express()

// configure routes
app.use("/posts", PostRoutes.build(postService))

// set up static content path
app.use("/content", StaticContent.build(dataDirectory, config.staticContentPath))

app.listen(config.listenPort, () => console.info("Coriander server started"))