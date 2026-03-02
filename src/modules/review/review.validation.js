import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createReviewSchema = Joi.object({
    content: Joi.string().min(5).required(),
    rating: Joi.number().min(1).max(5).required(),
    targetId: Joi.string().pattern(objectIdPattern).required(),
    onModel: Joi.string().valid('Pet', 'Product').required()
}).required();

export const reviewIdSchema = Joi.object({
    id: Joi.string().pattern(objectIdPattern).required()
}).required();