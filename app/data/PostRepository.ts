import * as fs from "fs";
import * as path from "path";

import Post from "../models/Post";
import config from "../Config";

export default class PostRepository {
    private _postDir: string;

    constructor(dataDir: string) {
        this._postDir = path.join(dataDir, config.postDataPath);
    }

    *posts(): IterableIterator<Post> {
        const encoding = "utf8";

        const files = fs.readdirSync(this._postDir, encoding)
            .filter(f => f.endsWith(".json")); //only json supported for now

        for (let index = 0; index < files.length; index++) {
            const fileName = files[index];

            const file = fs.readFileSync(path.join(this._postDir, fileName), { encoding: encoding });
            const post = JSON.parse(file) as Post;

            if(post.published){
                yield post;
            }
        }
    }
}