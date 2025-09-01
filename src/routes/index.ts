import { Router } from "express";
import userRouter from "./user.routes";
import pointRouter from "./point.routes";
import rewardRouter from "./reward.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/points", pointRouter);
router.use("/rewards", rewardRouter);

export default router;
