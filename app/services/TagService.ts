import ITagService from "./ITagService";
import PostRepository from "../data/PostRepository";

export default class TagService implements ITagService {
    private readonly _postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this._postRepository = postRepository;
    }
    
    getAllTags(){
        const posts = Array.from(this._postRepository.posts())
            .map(p => p.tags)
            .reduce((a, b) => a.concat(b), []) // combine all the tags
            .filter((text, index, array) => array.indexOf(text) === index) // make them unique

        return {
            tags: posts
        };
    }
}