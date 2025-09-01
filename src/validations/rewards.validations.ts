import Joi from "joi";

export const claimRewardSchema = Joi.object({
  rewardId: Joi.number().min(1).required(),
});
