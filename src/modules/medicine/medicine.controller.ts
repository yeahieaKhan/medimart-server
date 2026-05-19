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

// get single medicine

const getSingleMedicineC = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await MedicineService.getSingleMedicine(id as string);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
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

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await MedicineService.updateMedicine(id as string, req.body);

    return res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await MedicineService.deleteMedicine(id as string);

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: (error as Error).message || "Failed to delete medicine",
    });
  }
};

export const MedicineController = {
  createMedicine,
  getAllMedicine,
  getSingleMedicineC,
  updateMedicine,
  deleteMedicine,
};
