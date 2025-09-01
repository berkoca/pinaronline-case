import { Router } from "express";
import PointController from "../controllers/point.controller";
import authentication from "../middlewares/authentication.middleware";
import validate from "../middlewares/validation.middleware";
import {
  earnPointsSchema,
  redeemPointsSchema,
} from "../validations/points.validations";

const pointRouter = Router();
const pointController = new PointController();

/**
 * @openapi
 * /points/balance:
 *   get:
 *     tags:
 *      - Points
 *     summary: Get user's points balance
 *     description: Get user's points balance
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's balance successfully fetched.
 */
pointRouter.get("/balance", authentication, pointController.getBalance);
/**
 * @openapi
 * /points/history:
 *   get:
 *     tags:
 *      - Points
 *     summary: Get user's points history
 *     description: Get user's points history
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: integer
 *          default: 1
 *        description: Page number
 *      - in: query
 *        name: limit
 *        required: false
 *        schema:
 *          type: integer
 *          default: 10
 *        description: Limit of points entries
 *     responses:
 *       200:
 *         description: User's point history successfully fetched.
 */
pointRouter.get("/history", authentication, pointController.getHistory);
/**
 * @openapi
 * /points/earn:
 *   post:
 *     tags:
 *      - Points
 *     summary: Earn points
 *     description: Earn points
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              amount:
 *                type: number
 *                description: Amount of points
 *                example: 1
 *              description:
 *                type: string
 *                description: Description of earning points
 *                example: He/she won 1 point from shopping.
 *            required:
 *              - amount
 *              - description
 *     responses:
 *       200:
 *         description: User's point history successfully fetched.
 */
pointRouter.post(
  "/earn",
  authentication,
  validate(earnPointsSchema),
  pointController.earnPoints
);
/**
 * @openapi
 * /points/redeem:
 *   post:
 *     tags:
 *      - Points
 *     summary: Redeem points
 *     description: Redeem points
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              amount:
 *                type: number
 *                description: Amount of points
 *                example: 5
 *              description:
 *                type: string
 *                description: Description of earning points
 *                example: He/she redeemed 5 points.
 *            required:
 *              - amount
 *              - description
 *     responses:
 *       200:
 *         description: User redeemed points.
 */
pointRouter.post(
  "/redeem",
  authentication,
  validate(redeemPointsSchema),
  pointController.redeemPoints
);

export default pointRouter;
