import { prisma } from "../../lib/prisma";

const getAllOrders = async () => {
  const result = await prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });

  return result;
};

// get single order

const getSingleORder = async (id: string) => {
  console.log(id);
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const createOrder = async (payload: any) => {
  const { customerId, shippingAddress, phoneNumber, items } = payload;

  let totalPrice = 0;

  // Medicine check + total calculate
  const orderItemsData = await Promise.all(
    items.map(async (item: any) => {
      const medicine = await prisma.medicine.findUnique({
        where: {
          id: item.medicineId,
        },
      });

      if (!medicine) {
        throw new Error("Medicine not found");
      }

      if (medicine.stock < item.quantity) {
        throw new Error(`${medicine.name} stock not available`);
      }

      const itemTotal = medicine.price * item.quantity;

      totalPrice += itemTotal;

      return {
        medicineId: item.medicineId,
        quantity: item.quantity,
        price: medicine.price,
      };
    }),
  );

  // Transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create Order
    const order = await tx.order.create({
      data: {
        customerId,
        shippingAddress,
        phoneNumber,
        totalPrice,
      },
    });

    // Create Order Items
    await tx.orderItem.createMany({
      data: orderItemsData.map((item) => ({
        ...item,
        orderId: order.id,
      })),
    });

    // Reduce Stock
    for (const item of orderItemsData) {
      await tx.medicine.update({
        where: {
          id: item.medicineId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  });

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleORder,
};
