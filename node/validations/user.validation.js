const Joi = require("joi");

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(225).required(),
        city: Joi.string().min(4).max(54).required(),
        email: Joi.string().min(9).max(225).required().email(),
        password: Joi.string().min(8).max(225).required(),
        phone: Joi.string().min(9).max(13).required(),
        admin: Joi.boolean()
    });

    return schema.validate(user);
}

function validateUpdateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(225),
        city: Joi.string().min(4).max(54),
        email: Joi.string().min(9).max(225).email(),
        phone: Joi.string().min(9).max(13),
    });

    return schema.validate(user);
}

function validateUpdatePwd(pwd) {
    const schema = Joi.object({
        password: Joi.string().min(8).max(225).required(),
    });

    return schema.validate(pwd);
}

module.exports = { validateUser, validateUpdateUser, validateUpdatePwd };