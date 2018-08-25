import * as fs from "fs";
import * as path from "path";
import * as fm from "front-matter";

import Post from "../models/Post";
import config from "../Config";

interface FrontMatterContent {
    published?: boolean;
    id: number;
    slug: string;
    title: string;
    publishedDate: number;
    tags?: string[];
}

export default class PostRepository {
    private _postDir: string;

    constructor(dataDir: string) {
        this._postDir = path.join(dataDir, config.postDataPath);
    }

    *posts(): IterableIterator<Post> {
        const encoding = "utf8";

        const files = fs.readdirSync(this._postDir, encoding)
            .filter(f => f.endsWith(".md"));

        for (let index = 0; index < files.length; index++) {
            const fileName = files[index];

            const file = fs.readFileSync(path.join(this._postDir, fileName), { encoding: encoding });

            const fileContent = fm(file);
            const attributes = fileContent.attributes as FrontMatterContent;

            if(attributes.published){
                yield {
                    published: attributes.published,
                    id: attributes.id,
                    slug: attributes.slug,
                    title: attributes.title,
                    publishedDate: attributes.publishedDate,
                    tags: attributes.tags || [],
                    content: fileContent.body,
                };
            }
        }
    }
}