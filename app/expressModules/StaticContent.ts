import * as express from "express";
import * as path from "path";

export default class StaticContent {
    static build(absoluteDataDirectory: string, staticContentPath: string){
        const staticContentDirectory = path.join(absoluteDataDirectory, staticContentPath);
        
        console.info(`static content contained in: ${staticContentDirectory}`);

        return express.static(staticContentDirectory)
    }
}