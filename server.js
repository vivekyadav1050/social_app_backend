import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://social-app-frontend-2zuq.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("middleware/uploads",
  express.static("uploads")
);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);



app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});