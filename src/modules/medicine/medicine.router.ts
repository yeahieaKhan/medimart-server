import express from "express";
import { MedicineController } from "./medicine.controller";

const router = express.Router();

router.post("/medicine", MedicineController.createMedicine);
router.get("/medicine", MedicineController.getAllMedicine);
router.get("/medicine/:id", MedicineController.getSingleMedicineC);

export const MedicineRouter = router;
