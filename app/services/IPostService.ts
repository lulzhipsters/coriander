import Post from "../models/Post";

export default interface IPostService{
    allPosts(orderBy: string): Post[];
    postWithId(): Post;
    postWithSlug(): Post;
}