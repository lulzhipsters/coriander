import * as express from "express";
import * as path from "path";

import RouterConfig from "./RouterConfig";

//load the config
import config from "./Config";

const dataDirectory = path.isAbsolute(config.dataFolderPath) 
    ? config.dataFolderPath
    : path.join(__dirname, config.dataFolderPath);

const staticContentDirectory = path.join(dataDirectory, config.staticContentPath);

console.info(`static content contained in: ${staticContentDirectory}`);

let app = express()

// configure routes
app.use("", RouterConfig.configureRouter())

// set up static content path
app.use("/content", express.static(staticContentDirectory))

app.listen(3000, () => console.info("Coriander server started"))