import Post from "../models/post.js";

import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const createPost = async (req, res) => {
  try {
    
    let imageUrl = "";

  if (req.file) {
  const result =
    await cloudinary.uploader.upload(
      req.file.path
    );

  imageUrl = result.secure_url;

  fs.unlinkSync(req.file.path);
}
    const post = await Post.create({
      username: req.user.username,
      text: req.body.text,
      image: imageUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    console.log("CREATE POST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


export const getPosts = async (
  req,
  res
) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const likePost = async (
  req,
  res
) => {
  try {
    const { username } = req.body;

    const post =
      await Post.findById(req.params.id);

    if (!post.likes.includes(username)) {
      post.likes.push(username);
      await post.save();
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const commentPost = async (
  req,
  res
) => {
  try {
    const { username, text } =
      req.body;

    const post =
      await Post.findById(req.params.id);

    post.comments.push({
      username,
      text,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSinglePost = async (
  req,
  res
) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};