const Joi = require("joi");
const EMAIL_REGEX = "/S+@S+.S+/";
const ascii = "/^[\x00-\x7F]*$/";
module.exports = {
  user: {
    accountCreation: Joi.object().keys({
      firstname: Joi.string().min(1).required(),
      lastname: Joi.string().min(1).required(),
      email: Joi.string().regex(EMAIL_REGEX).email().required(),
      password: Joi.string()
        .regex(/^[\x20-\x7E]+$/)
        .min(8)
        .max(72)
        .required(),
    }),
    authentication: Joi.object().keys({
      email: Joi.string().regex().email().required(),
      password: Joi.string()
        .regex(/^[\x20-\x7E]+$/)
        .min(8)
        .max(72)
        .required(),
    }),
  },
  collection: {
    create: Joi.object().keys({
      collectionName: Joi.string().regex(ascii).min(1).max(30).required(),
      fields: Joi.array().min(1).required(),
      fieldsToShow: Joi.number().min(1).optional(),
    }),
    getCollectionsByOwner: Joi.string().uuid().required(),
    getCollectionsById: Joi.string().uuid().required(),
  },
  items: {
    create: Joi.object()
      .keys({
        collectionId: Joi.string().uuid().required(),
        image: Joi.optional(),
        fields: Joi.object({}).min(1).required().unknown(),
      })
      .unknown(),
    getById: Joi.string().uuid().required(),
    deleteItemByUUID: Joi.string().uuid().required(),
  },
};

// https://youtu.be/Zc2mQSQXoS4
