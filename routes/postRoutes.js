import express from "express";
import auth from "../middleware/auth.js";
import upload from "../uploads/upload.js";

import {
  createPost,
  getPosts,
  getSinglePost,
  likePost,
  commentPost,
} from "../controllers/postController.js";

const router = express.Router();

router.use(auth);

router.post(
  "/",
  upload.single("image"),
  createPost
);

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.put("/:id/like", likePost);

router.post("/:id/comment", commentPost);

export default router;