import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const user = await prisma.user.create({
    data: payload,
  });

  return user;
};

const updateUser = async (
  id: string,
  payload: {
    name?: string;
    password?: string;
  },
) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const getSingleUserService = async (id: string) => {
  console.log("get id from service", id);
  const result = await prisma.user.findUnique({
    where: { id },
  });
  console.log("result form service", result);

  if (!result) {
    throw new Error("User not found");
  }

  return result;
};

export const UserService = {
  getAllUsers,
  createUser,
  updateUser,
  getSingleUserService,
};
