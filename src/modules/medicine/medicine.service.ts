import { IUpdateMedicine } from "../../../type/medicine.interface";
import { prisma } from "../../lib/prisma";

const getAllMedicineService = async () => {
  const result = await prisma.medicine.findMany();
  return result;
};

const getSingleMedicine = async (id: string) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const createMedicine = async (payload: {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  dosage?: string;
  expiryDate?: Date;
  requiresPrescription?: boolean;
  discount?: number;
  sellerId: string;
  categoryId: string;
}) => {
  const result = await prisma.medicine.create({
    data: {
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      manufacturer: payload.manufacturer,

      dosage: payload.dosage ?? null,
      expiryDate: payload.expiryDate ?? null,
      requiresPrescription: payload.requiresPrescription ?? false,
      discount: payload.discount ?? 0,

      sellerId: payload.sellerId,
      categoryId: payload.categoryId,
    },
  });

  return result;
};

// get single medicine

const updateMedicine = async (id: string, payload: IUpdateMedicine) => {
  // Check medicine exists
  const existingMedicine = await prisma.medicine.findUnique({
    where: {
      id,
    },
  });

  if (!existingMedicine) {
    throw new Error("Medicine not found");
  }

  // Check duplicate slug
  if (payload.slug) {
    const slugExists = await prisma.medicine.findFirst({
      where: {
        slug: payload.slug,
        NOT: {
          id,
        },
      },
    });

    if (slugExists) {
      throw new Error("Slug already exists");
    }
  }

  // Update medicine
  const result = await prisma.medicine.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const MedicineService = {
  createMedicine,
  getAllMedicineService,
  getSingleMedicine,
  updateMedicine,
};
