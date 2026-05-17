import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/users", UserController.getAllUsers);

router.post("/users", UserController.createUser);

export const UserRoutes = router;
