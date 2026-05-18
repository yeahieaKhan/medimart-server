import express from "express";
import { MedicineController } from "./medicine.controller";

const router = express.Router();

router.post("/medicine", MedicineController.createMedicine);
router.get("/medicine", MedicineController.getAllMedicine);

export const MedicineRouter = router;
