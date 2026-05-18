import express, { Request, Response } from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import { UserRoutes } from "./modules/user/user.router";
import { MedicineRouter } from "./modules/medicine/medicine.router";
import { OrderRouter } from "./modules/order/order.router";

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/
app.use(cors());

app.use(express.json());

//

/*
|--------------------------------------------------------------------------
| GET ALL USERS
|--------------------------------------------------------------------------
*/
// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();

//     res.json(users);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch users",
//       error,
//     });
//   }
// });

// app.post("/users", async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password,
//       },
//     });

//     res.status(201).json({
//       message: "User created successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create user",
//       error,
//     });
//   }
// });

app.use("/", UserRoutes);
app.use("/", MedicineRouter);
app.use("/", OrderRouter);

export default app;
