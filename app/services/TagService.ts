import ITagService from "./ITagService";
import PostRepository from "../data/PostRepository";

export default class TagService implements ITagService {
    private readonly _postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this._postRepository = postRepository;
    }
    
    getAllTags(){
        const tags = Array.from(this._postRepository.posts())
            .map(p => p.tags)
            .reduce((a, b) => a.concat(b), []) // combine all the tags

        // make an uppercased copy, so we can remove duplicates ignoring case
        const uppercased = tags.slice()
            .map(t =>  t.toUpperCase());

        const returnTags = tags
            .filter((text, index, array) => uppercased.indexOf(text.toUpperCase()) === index) // make them unique

        return {
            tags: returnTags
        };
    }
}