import Joi from "joi-oid";

const schema_signin = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .messages({
      'string.empty': 'The email cannot be empty',
      'any.required': 'A email is required',
    }),
  password: Joi
    .string()
    .required()
    .messages({
      'string.empty': 'The password cannot be empty',
      'any.required': 'A password is required',
    })
});

export default schema_signin;