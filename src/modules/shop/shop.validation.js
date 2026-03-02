import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createProductSchema = Joi.object({
    title: Joi.string().min(3).max(100).trim().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().min(10).max(1000).required(),
    category: Joi.string().valid('Food', 'Accessories', 'Medicine').required(),
    stock: Joi.number().integer().min(0).default(0),
    images: Joi.array().items(Joi.string()).min(1).required(),
}).required();

export const updateProductSchema = Joi.object({
    id: Joi.string().pattern(objectIdPattern).required(), 
    title: Joi.string().min(3).max(100).trim(),
    price: Joi.number().positive(),
    description: Joi.string().min(10).max(1000),
    category: Joi.string().valid('Food', 'Accessories', 'Medicine'),
    stock: Joi.number().integer().min(0),
    images: Joi.array().items(Joi.string()),
}).min(1); 