import Joi from 'joi';

const productSchema = Joi.object({
	id: Joi.number().required(),
	quantity: Joi.number().min(1).required(),
});

export { productSchema };
