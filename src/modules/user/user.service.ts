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

export const UserService = {
  getAllUsers,
  createUser,
};
