import ApiPost from "./ApiPost";

export default interface ApiPostSet {
    posts: ApiPost[],
    next: number 
};