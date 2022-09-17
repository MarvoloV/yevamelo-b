const Joi = require('joi');

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});

const PayloadSchema = Joi.object().keys({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'es', 'co'] },
    }),
  dni: Joi.string().required(),
  store: Joi.string().required(),
  cellphone: Joi.string().required(),
  password: Joi.string().required().min(6),
  role: Joi.string().default('user'),
});

const UserSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = {
  UserSchema,
};
