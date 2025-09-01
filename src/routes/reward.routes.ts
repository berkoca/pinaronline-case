import { Router } from "express";
import RewardController from "../controllers/reward.controller";
import authentication from "../middlewares/authentication.middleware";
import validate from "../middlewares/validation.middleware";
import { claimRewardSchema } from "../validations/rewards.validations";

const rewardRouter = Router();
const rewardController = new RewardController();

/**
 * @openapi
 * /rewards:
 *   get:
 *     tags:
 *      - Rewards
 *     summary: Get rewards list
 *     description: Get rewards list
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
 *        description: Limit of reward entries
 *     responses:
 *       200:
 *         description: Available rewards has been fetched successfully.
 */
rewardRouter.get("/", authentication, rewardController.getRewards);
/**
 * @openapi
 * /rewards/{id}:
 *    get:
 *      tags:
 *        - Rewards
 *      summary: Get a single reward
 *      description: Get a single reward
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of reward that needs to be fetched
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Reward has been fetched successfully.
 */
rewardRouter.get("/:id", authentication, rewardController.getReward);
/**
 * @openapi
 * /rewards/claim:
 *   post:
 *     tags:
 *      - Rewards
 *     summary: Claim reward with points
 *     description: Claim reward with points
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              rewardId:
 *                type: number
 *                description: Id of the reward
 *                example: 1
 *            required:
 *              - rewardId
 *     responses:
 *       200:
 *         description: Reward claimed successfully.
 */
rewardRouter.post(
  "/claim",
  authentication,
  validate(claimRewardSchema),
  rewardController.claimReward
);

export default rewardRouter;
