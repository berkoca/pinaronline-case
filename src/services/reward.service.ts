import { PointType } from "@prisma/client";
import BadRequestError from "../errors/bad-request-error";
import prisma from "../utils/database";
import PointService from "./point.service";

class RewardService {
  public async getRewards(page: number = 1, limit: number = 10) {
    const skip = page > 1 ? page * limit - limit : 0;
    const take = limit;

    const rewards = await prisma.reward.findMany({
      skip: skip,
      take: take,
    });

    return rewards;
  }

  public async getReward(rewardId: number) {
    const reward = await prisma.reward.findUnique({ where: { id: rewardId } });

    // If reward does not exist with given id then throw error
    if (!reward) {
      throw new BadRequestError(
        `Can't find a reward with given id: ${rewardId}.`
      );
    }

    return reward;
  }

  public async claimReward(userId: number, rewardId: number) {
    const pointService = new PointService();

    const reward = await prisma.reward.findUnique({ where: { id: rewardId } });

    // If reward does not exist with given id then throw error
    if (!reward) {
      throw new BadRequestError(
        `Can't find a reward with given id: ${rewardId}.`
      );
    }

    const userBalance = await pointService.getBalance(userId);

    // If reward does not have enough stock then throw error
    if (reward.stock <= 0) {
      throw new BadRequestError("Reward does not have stock.");
    }

    // If user does not have enough points to claim reward then throw error
    if (userBalance < reward.pointsCost) {
      throw new BadRequestError(
        "User does not have enough points to claim this reward."
      );
    }

    // Redeem points from user
    await prisma.point.create({
      data: {
        userId: userId,
        type: PointType.REDEEM,
        amount: reward.pointsCost,
        description: `User claimed a reward (id: ${reward.id} - system message)`,
      },
    });

    // Descrease reward's stock
    await prisma.reward.update({
      where: {
        id: reward.id,
      },
      data: {
        stock: reward.stock - 1,
      },
    });
  }
}

export default RewardService;
