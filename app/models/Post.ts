export default interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    publishedDate: number;
    published: boolean;
    tags: string[];
    banner: string;
}