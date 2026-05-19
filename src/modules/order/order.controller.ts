import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { UserService } from "../user/user.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.createOrder(req.body);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrders();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log("Id from controller:", id);

    const result = await OrderService.getSingleORder(id as string);

    res.status(200).json({
      success: true,
      message: "Single order fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

const updateSellerStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await OrderService.updateSellerStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: "Seller status updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || "Failed to update seller status",
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateSellerStatus,
};
