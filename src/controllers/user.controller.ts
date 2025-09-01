import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  public async register(request: Request, response: Response) {
    const userService = new UserService();

    const newUser = await userService.createUser(request.body);

    return response.status(201).json({
      data: newUser,
      message: "Successfully registered.",
    });
  }

  public async login(request: Request, response: Response) {
    const userService = new UserService();

    const token = await userService.getToken(request.body);

    return response.status(200).json({
      data: { token },
      message: "Successfully logged in.",
    });
  }

  public async getProfile(request: Request, response: Response) {
    const userService = new UserService();

    const profile = await userService.getProfile(request.user.id);

    return response.status(200).json({
      data: profile,
      message: "User's profile fetched.",
    });
  }
}

export default UserController;
