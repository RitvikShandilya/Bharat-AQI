const Joi = require('@hapi/joi');

module.exports.getAllProductSchema = Joi.object().keys({
    skip = Joi.string(),
    limit: Joi.string()
})