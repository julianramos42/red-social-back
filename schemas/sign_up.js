import Joi from "joi-oid";

const schema = Joi.object({
  name: Joi
    .string()
    .required()
    .min(3)
    .max(30)
    .messages({
      "string.min": "The name must have at least 3 characteres",
      "string.max": "The name must have a maximum of 30 characteres",
      'string.empty': 'The name cannot be empty',
      'any.required': 'A name is required',
    }),
  photo: Joi
    .string()
    .required()
    .allow('')
    .min(8)
    .uri()
    .messages(
      {
        'string.min': 'The photo must be at least 8 characters',
        'string.empty': 'The photo cannot be empty',
        'any.required': 'A photo is required',
        'string.uri': 'A valid URL is necessary'
      }),
  email: Joi
    .string()
    .required()
    .min(8)
    .email({ minDomainSegments: 2 })
    .messages({
      "string.min": "The email must have at least 8 characteres",
      'string.empty': 'The email cannot be empty',
      'any.required': 'A email is required',
      'string.email': 'Must be a valid email'
    }),
  password: Joi
    .string()
    .required()
    .min(6)
    .max(20)
    .messages({
      "string.min": "The password must have at least 6 characteres",
      "string.max": "The password must have a maximum of 20 characteres",
      'string.empty': 'The password cannot be empty',
      'any.required': 'A password is required',
    })
});

export default schema;