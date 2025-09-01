import { Prisma } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import BadRequestError from "../errors/bad-request-error";
import prisma from "../utils/database";

class UserService {
  public async createUser(payload: Prisma.UserCreateInput) {
    // Check if user already exist with given email address
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { id: true },
    });

    if (user) {
      throw new BadRequestError("Email address already in use.");
    }

    // If email address is available, then create a new user with encrypted password
    return await prisma.user.create({
      data: { ...payload, password: await hash(payload.password, 8) },
    });
  }

  public async getToken(payload: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    // If user does not exist then throw error
    if (!user) {
      throw new BadRequestError("Please check your email or password.");
    }

    const isPasswordTrue = await compare(payload.password, user.password);

    // If password does not match then throw error
    if (!isPasswordTrue) {
      throw new BadRequestError("Please check your email or password.");
    }

    // Sign a new token
    const token = sign({ user }, process.env.TOKEN_SECRET || "secret", {
      expiresIn: 84600,
    });

    return token;
  }

  public async getProfile(userId: number) {
    // Get user information alongside last 10 points history
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        points: {
          select: {
            id: true,
            type: true,
            amount: true,
            description: true,
            createdAt: true,
          },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new BadRequestError("User has not been found!");
    }

    return user;
  }
}

export default UserService;
