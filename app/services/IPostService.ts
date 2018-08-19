import ApiPost from "../models/ApiPost";
import ApiPostSet from "../models/ApiPostSet";

export default interface IPostService{
    allPosts(orderBy: string, firstPostId: number, postsPerPage: number): ApiPostSet;
    postWithId(id: number): ApiPost;
    postWithSlug(slug: string): ApiPost;
    postsWithTag(tag: string, orderBy: string, firstPostId: number, postsPerPage: number): ApiPostSet;
}