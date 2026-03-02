
import Joi from 'joi';


export const createPetSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    species: Joi.string().valid('dog', 'cat', 'bird', 'other').required(),
    breed: Joi.string().optional(),
    age: Joi.number().min(0).max(20).required(),
    description: Joi.string().min(10).required(),
    images: Joi.array().items(Joi.string()).min(1).required()
}).required();

export const updatePetSchema = Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
    name: Joi.string().min(2).max(30).optional(),
    species: Joi.string().valid('dog', 'cat', 'bird', 'other').optional(),
    age: Joi.number().min(0).optional(),
    description: Joi.string().min(10).optional(),
    isAdopted: Joi.boolean().optional()
}).required();