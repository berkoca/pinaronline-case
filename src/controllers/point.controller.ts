import { Request, Response } from "express";
import PointService from "../services/point.service";

class PointController {
  public async getBalance(request: Request, response: Response) {
    const pointService = new PointService();

    const balance = await pointService.getBalance(request.user.id);

    return response.status(200).json({
      data: { balance },
      message: "User's balance successfully fetched.",
    });
  }

  public async getHistory(request: Request, response: Response) {
    const pointService = new PointService();

    const page = request.query?.page
      ? parseInt(request.query?.page as string)
      : 1;
    const limit = request.query?.limit
      ? parseInt(request.query?.limit as string)
      : 10;

    const userPoints = await pointService.getHistory(
      request.user.id,
      page,
      limit
    );

    return response.status(200).json({
      data: userPoints,
      message: "User's point history successfully fetched.",
    });
  }

  public async earnPoints(request: Request, response: Response) {
    const pointService = new PointService();

    const earnedPoints = await pointService.earnPoints(
      request.user.id,
      request.body
    );

    return response.status(201).json({
      data: earnedPoints,
      message: "User earned new points.",
    });
  }

  public async redeemPoints(request: Request, response: Response) {
    const pointService = new PointService();

    const redeemedPoints = await pointService.earnPoints(
      request.user.id,
      request.body
    );

    return response.status(201).json({
      data: redeemedPoints,
      message: "User redeemed points.",
    });
  }
}

export default PointController;
