import { Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);

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
};

export const UserController = {
  getAllUsers,
  createUser,
};
