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

export const MedicineService = {
  createMedicine,
  getAllMedicineService,
  getSingleMedicine,
};
