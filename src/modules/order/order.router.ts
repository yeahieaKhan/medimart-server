import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/order", OrderController.createOrder);

router.get("/order", OrderController.getAllOrders);
router.get("/order/:id", OrderController.getSingleOrder);
router.get("/order/:id", OrderController.getSingleOrder);
router.patch("/order/:id", OrderController.updateSellerStatus);

export const OrderRouter = router;
