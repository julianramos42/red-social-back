import Joi from "joi-oid";

const schema_publication = Joi.object({
  text: Joi.string()
    .required()
    .messages({
      'string.empty': 'The publication cannot be empty',
      'any.required': 'A publication is required',
    })
});

export default schema_publication;