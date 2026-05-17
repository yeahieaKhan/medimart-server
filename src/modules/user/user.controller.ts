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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await UserService.getSingleUserService(id as string);
    res.json(result);
    console.log("result form controoller", result);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
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
const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserService.updateUser(id as string, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await UserService.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error,
    });
  }
};

export const UserController = {
  getAllUsers,
  createUser,
  updateUserController,
  getSingleUser,
  deleteUser,
};
