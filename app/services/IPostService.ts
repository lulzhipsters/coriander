import Post from "../models/Post";

export default interface IPostService{
    allPosts(orderBy: string, firstPostId: number, postsPerPage: number): { posts: Post[], next: number };
    postWithId(id: number): Post;
    postWithSlug(slug: string): Post;
}