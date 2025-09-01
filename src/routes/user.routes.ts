import { Router } from "express";
import UserController from "../controllers/user.controller";
import authentication from "../middlewares/authentication.middleware";
import validate from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validations/users.validations";

const userRouter = Router();
const userController = new UserController();

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags:
 *      - Users
 *     summary: Registers a new user
 *     description: Registers a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Username of the user
 *                example: "berkoca"
 *              email:
 *                type: string
 *                description: Email address of the user
 *                example: "berk1937@gmail.com"
 *              password:
 *                type: string
 *                description: Password of the user
 *                example: "123456"
 *            required:
 *              - username
 *              - email
 *              - password
 *     responses:
 *       201:
 *         description: Successfully registered.
 */
userRouter.post("/register", validate(registerSchema), userController.register);
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *      - Users
 *     summary: Login with credentials
 *     description: Login with credentials
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email address of the user
 *                example: "berk1937@gmail.com"
 *              password:
 *                type: string
 *                description: Password of the user
 *                example: "123456"
 *            required:
 *              - email
 *              - password
 *     responses:
 *       200:
 *         description: Successfully logged in.
 */
userRouter.post("/login", validate(loginSchema), userController.login);
/**
 * @openapi
 * /users/profile:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get user's information
 *     description: Get user's information
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged in.
 */
userRouter.get("/profile", authentication, userController.getProfile);

export default userRouter;
