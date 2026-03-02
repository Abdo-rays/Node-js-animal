import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createOrderSchema = Joi.object({
    orderType: Joi.string().valid('Adoption', 'Purchase').required(),
    address: Joi.string().required(),
    phone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .required()
        .messages({
            'string.pattern.base': 'Error in Phone Number',
        }),
    pet: Joi.string().pattern(objectIdPattern).optional(),
    products: Joi.array().items(Joi.object({
        product: Joi.string().pattern(objectIdPattern).required(),
        quantity: Joi.number().min(1).default(1)
    })).optional(),
    totalPrice: Joi.number().min(0).default(0)
}).required();

export const orderIdSchema = Joi.object({
    id: Joi.string().pattern(objectIdPattern).required()
}).required();