import prisma from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import jwt from  "jsonwebtoken"
import prisma from "../config/db.js";
import { generateAccessToken,generateRefreshToken } from "../utils/jwt.js";
// signup
export const signupService = async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};

// login
export const loginService = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.token.create({
    data: {
      userId: user.id,
      token: refreshToken,
      type: "REFRESH",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return { accessToken, refreshToken };
};
export const refreshService = async (oldToken) => {
  // check token in DB
  const stored = await prisma.token.findFirst({
    where: { token: oldToken },
  });

  if (!stored) {
    throw new Error("Invalid refresh token");
  }

  // verify token
  const payload = jwt.verify(oldToken, process.env.REFRESH_SECRET);

  // ❌ DELETE OLD TOKEN (rotation)
  await prisma.token.delete({
    where: { id: stored.id },
  });

  // ✅ CREATE NEW TOKENS
  const accessToken = generateAccessToken({
    id: payload.id,
    role: payload.role,
  });

  const newRefreshToken = generateRefreshToken({
    id: payload.id,
  });

  // store new refresh token
  await prisma.token.create({
    data: {
      userId: payload.id,
      token: newRefreshToken,
      type: "REFRESH",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
export const logoutAllService = async (userId) => {
  await prisma.token.deleteMany({
    where: { userId },
  });
};

