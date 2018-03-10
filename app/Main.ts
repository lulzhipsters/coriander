import * as express from "express";
import * as path from "path";

import BlogRoutes from "./expressModules/BlogRoutes";
import StaticContent from "./expressModules/StaticContent";

import PostService from "./services/PostService";

//load the config
import config from "./Config";

const dataDirectory = path.isAbsolute(config.dataFolderPath) 
    ? config.dataFolderPath
    : path.join(__dirname, config.dataFolderPath);

let app = express()

// configure routes
app.use("/blog", BlogRoutes.build(new PostService()))

// set up static content path
app.use("/content", StaticContent.build(dataDirectory, config.staticContentPath))

app.listen(3000, () => console.info("Coriander server started"))