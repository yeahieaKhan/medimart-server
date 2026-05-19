export interface IUpdateMedicine {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  stock?: number;
  manufacturer?: string;
  dosage?: string;
  expiryDate?: Date;
  requiresPrescription?: boolean;
  discount?: number;
  categoryId?: string;
}
