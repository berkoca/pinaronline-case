// tests/setup.ts
import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../src/app";

export const prisma = new PrismaClient();
export const api = request(app);

beforeAll(async () => {
  await prisma.$connect();
  await prisma.point.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
