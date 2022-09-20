const Joi = require("joi");

function validateUserMsg(userMsg) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(225).required(),
        email: Joi.string().email().required(),
        msg: Joi.string().min(2).max(2255).required()
    });

    return schema.validate(userMsg);
}

module.exports = validateUserMsg;