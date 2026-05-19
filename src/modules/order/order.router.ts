import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/order", OrderController.createOrder);

router.get("/order", OrderController.getAllOrders);
router.get("/order/:id", OrderController.getSingleOrder);

export const OrderRouter = router;
