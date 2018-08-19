import IPostService from "./IPostService";
import Post from "../models/Post";
import config from "../Config";

export default class PostService implements IPostService {
    allPosts(orderBy, firstPostId: number, postsPerPage: number) {
        const sortFunction = this.getSortFunction(orderBy);
        const postsRequired = postsPerPage || config.defaultPostsPerPage;

        const posts = this.getDummyPosts()
            .concat()
            .sort(sortFunction);

        const start = firstPostId !== null
            ? posts.findIndex(p => p.id === firstPostId) || 0
            : 0;

        const end = start + postsRequired;

        let pagedPosts = posts.slice(start, end + 1);

        // if there are more, remove the last and make it the 'next' post
        let next = pagedPosts.length > postsRequired
            ? pagedPosts.pop().id
            : undefined

        return {
            posts: pagedPosts,
            next: next
        }
    }

    postWithId(id: number): Post {
        return this.getDummyPosts()
            .find(p => p.id === id);
    }

    postWithSlug(slug: string): Post {
        return this.getDummyPosts()
            .find(p => p.slug === slug);
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

    private getDummyPosts(): Post[]{
        return [
            {
                id: 1,
                slug: "first-test-post",
                content: "The content of the post would be here",
                publishedDate: 1534662227088
            },
            {
                id: 2,
                slug: "second-test-post",
                content: "The second test post also has content",
                publishedDate: 1534662227999
            },
            {
                id: 4,
                slug: "another-test-post",
                content: "Anther test post, after the others",
                publishedDate: 1534662228001
            }
        ];
    }
}