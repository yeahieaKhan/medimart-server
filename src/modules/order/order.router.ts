import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/order", OrderController.createOrder);

router.get("/order", OrderController.getAllOrders);

export const OrderRouter = router;
