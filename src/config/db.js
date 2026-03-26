import pkg from "@prisma/client";

const { PrismaClient } = pkg; // extract from default export

const prisma = new PrismaClient();

export default prisma;