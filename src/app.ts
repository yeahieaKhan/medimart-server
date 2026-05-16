import express, { Request, Response } from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/
app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| GET ALL USERS
|--------------------------------------------------------------------------
*/
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error,
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error,
    });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error,
    });
  }
});

export default app;
