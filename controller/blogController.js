import BLOG from "../schema/blog.js";

import { nanoid } from "nanoid";

export const handleCreateBlog = async (req, res) => {
  const { title, subTitle, content, author } = req.body;
  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
  const blogId = nanoid(6);

  try {
    const newBlog = new BLOG({
      blogId,
      title,
      subTitle,
      content,
      author,
      images: imagePaths,
    });
    newBlog.save();
    return res.send("blog uploaded");
  } catch (error) {
    console.log("error creating new blog", error);
  }
};

export const handleGetAllBlog = async (req, res) => {
  const allBlogs = await BLOG.find({});
  return res.json(allBlogs);
};

export const handleGetBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BLOG.findOne({ blogId: id });
    return res.status(200).json(blog);
  } catch (error) {
    console.log("error getting blog by id", error);
  }
};

export const handleDeleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await BLOG.findOneAndDelete({ blogId: id });
    return res.status(200).json({ message: "blog deleted" });
  } catch (error) {
    console.log("error deleting blog", error);
  }
};

export const handleUpdateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await BLOG.findOneAndUpdate({ blogId: id }, req.body);
    return res.status(200).json({ message: "blog updated" });
  } catch (error) {
    console.log("error updating blog", error);
  }
};
