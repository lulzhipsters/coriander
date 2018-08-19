import ApiTagSet from "../models/ApiTagSet";

export default interface TagService {
    getAllTags(): ApiTagSet;
}