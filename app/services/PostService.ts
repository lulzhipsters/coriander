import IPostService from "./IPostService";
import Post from "../models/Post";

export default class PostService implements IPostService {
    allPosts(orderBy): Post[] {
        throw new Error("Method not implemented.");
    }
    postWithId(): Post {
        throw new Error("Method not implemented.");
    }
    postWithSlug(): Post {
        throw new Error("Method not implemented.");
    }

    private getSortFunction(name: string){
        switch (name.toLowerCase()) {
            case "dateascending":
                return (a: Post, b: Post) => { return a.publishedDate.getTime() - b.publishedDate.getTime() }        
            default:
                return (a: Post, b: Post) => { return b.publishedDate.getTime() - a.publishedDate.getTime() } // Date Desc
        }
    }
}