import Joi from "joi";

export const earnPointsSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  description: Joi.string().min(1).max(50).required(),
});

export const redeemPointsSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  description: Joi.string().min(1).max(50).required(),
});
