import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    images: {
        type: [String], 
        default: [], 
    },
    date: {
        type: Date,
        default: Date.now,
    },
},{timestamps : true}
);

const BLOG = mongoose.model("blog", blogSchema);
export default BLOG;