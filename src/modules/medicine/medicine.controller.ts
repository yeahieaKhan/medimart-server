import { Request, Response } from "express";
import { MedicineService } from "./medicine.service";

/*
|--------------------------------------------------------------------------
| CREATE MEDICINE
|--------------------------------------------------------------------------
*/
// get all medicine

const getAllMedicine = async (req: Request, res: Response) => {
  try {
    const result = await MedicineService.getAllMedicineService();

    return res.status(200).json({
      success: true,
      message: "Medicines fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
      error: (error as Error).message,
    });
  }
};

const createMedicine = async (req: Request, res: Response) => {
  try {
    const result = await MedicineService.createMedicine(req.body);

    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create medicine",
      error,
    });
  }
};

export const MedicineController = {
  createMedicine,
  getAllMedicine,
};
