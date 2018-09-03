import * as wu from "wu";

import IPostService from "./IPostService";
import Post from "../models/Post";
import config from "../Config";
import PostRepository from "../data/PostRepository";
import ApiPost from "../models/ApiPost";

export default class PostService implements IPostService {
    private _postRepo: PostRepository;

    constructor(posts: PostRepository){
        this._postRepo = posts;
    }

    allPosts(orderBy: string, firstPostId: number, postsPerPage: number) {
        const posts = Array.from(this._postRepo.posts());

        return this.getPostSet(posts, orderBy, firstPostId, postsPerPage);
    }

    postWithId(id: number) {
        const posts = this._postRepo.posts();

        const post = wu(posts)
            .find(p => p.id === id);

        return this.mapToApiPost(post);
    }

    postWithSlug(slug: string) {
        const posts = this._postRepo.posts();
        
        const post = wu(posts)
            .find(p => p.slug === slug);

        return this.mapToApiPost(post);
    }

    postsWithTag(tag: string, orderBy: string, firstPostId: number, postsPerPage: number) {
        const posts = Array.from(this._postRepo.posts())
            .filter(p => !!p.tags && p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));

        return this.getPostSet(posts, orderBy, firstPostId, postsPerPage);
    }

    private getPostSet(posts: Post[], orderBy: string, firstPostId: number, postsPerPage: number){
        const sortedPosts = posts
            .concat()
            .sort(this.getSortFunction(orderBy));
        
        const postsRequired = postsPerPage || config.defaultPostsPerPage;

        const start = firstPostId !== null
            ? sortedPosts.findIndex(p => p.id === firstPostId) || 0
            : 0;

        const end = start + postsRequired;

        let pagedPosts = sortedPosts.slice(start, end + 1);

        // if there are more, remove the last and make it the 'next' post
        let next = pagedPosts.length > postsRequired
            ? pagedPosts.pop().id
            : undefined

        return {
            posts: pagedPosts.map(p => this.mapToApiPost(p)),
            next: next
        }
    }

    private getSortFunction(name: string){
        if(name == null){
            name = "";
        }

        switch (name.toLowerCase()) {
            case "dateascending":
                return (a: Post, b: Post) => { return a.publishedDate - b.publishedDate }     
            default:
                return (a: Post, b: Post) => { return b.publishedDate - a.publishedDate } // Date Desc
        }
    }

    private mapToApiPost(post: Post): ApiPost {
        if(!post){
            return null;
        }

        return {
            id: post.id,
            slug: post.slug,
            title: post.title,
            content: post.content,
            publishedDate: post.publishedDate,
            tags: post.tags || [],
            banner: post.banner
        }
    }
}