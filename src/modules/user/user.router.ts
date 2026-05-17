import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.createUser);

router.patch("/users/:id", UserController.updateUserController);
router.get("/users/:id", UserController.getSingleUser);
router.delete("/users/:id", UserController.deleteUser);
export const UserRoutes = router;
