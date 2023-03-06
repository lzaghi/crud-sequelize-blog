const Joi = require('joi');

const validateCredentials = (body) =>
  /* Utilizamos o Joi para validar o schema do body */
  Joi.object({
    displayName: Joi.string().min(8).required()
      .messages({
        'string.min': '"displayName" length must be at least 8 characters long',
      }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  }).validate(body);

module.exports = {
  validateCredentials,
};