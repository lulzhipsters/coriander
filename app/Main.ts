import * as express from "express";
import * as path from "path";

import config from "./Config";

import PostRoutes from "./expressModules/PostRoutes";
import StaticContent from "./expressModules/StaticContent";

import TagRoutes from "./expressModules/TagRoutes";
import PostService from "./services/PostService";
import PostRepository from "./data/PostRepository";
import TagService from "./services/TagService";
import GitWatcher from "./gitWatcher/GitWatcher";

const dataDirectory = path.isAbsolute(config.dataFolderPath) 
    ? config.dataFolderPath
    : path.join(__dirname, config.dataFolderPath);

const postRepository = new PostRepository(dataDirectory);
const postService = new PostService(postRepository);
const tagService = new TagService(postRepository);

///////////////////
// Start Express //
///////////////////
let app = express()

// enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", config.corsAllowed);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// configure routes
app.use("/posts", PostRoutes.build(postService))
app.use("/tags", TagRoutes.build(tagService));

// set up static content path
app.use("/content", StaticContent.build(dataDirectory, config.staticContentPath))

app.listen(config.listenPort, () => console.info("Coriander server started"))

////////////////////
// Watch the repo //
////////////////////
if(config.gitWatchEnabled){
    new GitWatcher({
        repoPath: dataDirectory,
        user: config.gitUser,
        password: config.gitPassword,
        branch: config.gitBranch,
        interval: config.gitFetchInterval
    }).watch();
}