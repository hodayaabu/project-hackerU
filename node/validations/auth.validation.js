const Joi = require("joi");

function validateAuth(auth) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required()
    });

    return schema.validate(auth);
}

module.exports = validateAuth;