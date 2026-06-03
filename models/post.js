import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    username: String,
    text: String,
    image: String,
    likes: [String],
    comments: [
      {
        username: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);