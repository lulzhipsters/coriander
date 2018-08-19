export default interface ApiPost {
    id: number;
    slug: string;
    title: string;
    content: string;
    publishedDate: number;
    tags: string[];
}