import { Request, Response } from "express";
import RewardService from "../services/reward.service";

class RewardController {
  public async getRewards(request: Request, response: Response) {
    const rewardService = new RewardService();

    const page = request.query?.page
      ? parseInt(request.query?.page as string)
      : 1;
    const limit = request.query?.limit
      ? parseInt(request.query?.limit as string)
      : 10;

    const rewards = await rewardService.getRewards(page, limit);

    return response.status(200).json({
      data: rewards,
      message: "Available rewards has been fetched successfully.",
    });
  }

  public async getReward(request: Request, response: Response) {
    const rewardService = new RewardService();

    const reward = await rewardService.getReward(parseInt(request.params.id));

    return response.status(200).json({
      data: reward,
      message: "Reward has been fetched successfully.",
    });
  }

  public async claimReward(request: Request, response: Response) {
    const rewardService = new RewardService();

    await rewardService.claimReward(request.user.id, request.body.rewardId);

    return response.status(200).json({
      message: "Reward claimed successfully.",
    });
  }
}

export default RewardController;
