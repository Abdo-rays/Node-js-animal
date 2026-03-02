import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createReportSchema = Joi.object({
    reason: Joi.string().min(5).max(100).required(),
    details: Joi.string().max(500).optional(),
    targetId: Joi.string().pattern(objectIdPattern).required(),
    onModel: Joi.string().valid('Pet', 'Product', 'User', 'Post').required() // ضفنا Post هنا
}).required();

export const reportIdSchema = Joi.object({
    id: Joi.string().pattern(objectIdPattern).required()
}).required();