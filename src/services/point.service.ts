import { PointType } from "@prisma/client";
import prisma from "../utils/database";

class PointService {
  public async getBalance(userId: number) {
    const now = new Date();

    const userPoints = await prisma.point.findMany({
      where: {
        userId: userId,
        OR: [
          { type: PointType.EARN, expiresAt: { gte: now } },
          { type: PointType.REDEEM },
        ],
      },
      select: { amount: true, type: true },
    });

    return userPoints.reduce((sum, point) => {
      return point.type === PointType.EARN
        ? sum + point.amount
        : sum - point.amount;
    }, 0);
  }

  public async getHistory(
    userId: number,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = page > 1 ? page * limit - limit : 0;
    const take = limit;

    const userPoints = await prisma.point.findMany({
      where: { userId: userId },
      skip: skip,
      take: take,
    });

    return userPoints;
  }

  public async earnPoints(
    userId: number,
    payload: { amount: number; description: string }
  ) {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const earnedPoints = await prisma.point.create({
      data: {
        userId: userId,
        type: PointType.EARN,
        amount: payload.amount,
        description: payload.description,
        expiresAt: expiresAt,
      },
    });

    return earnedPoints;
  }

  public async redeemPoints(
    userId: number,
    payload: { amount: number; description: string }
  ) {
    const redeemedPoints = await prisma.point.create({
      data: {
        userId: userId,
        type: PointType.REDEEM,
        amount: payload.amount,
        description: payload.description,
      },
    });

    return redeemedPoints;
  }
}

export default PointService;
