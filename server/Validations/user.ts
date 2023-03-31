import Joi from 'joi';

const signUp = {
    body: Joi.object().required().keys({
        userName: Joi.string().min(3).required(),
        password: Joi.string().required().pattern(new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*_]')).message("Password must contain at least one number , Capital letter and one special character"),
    }),
};

const signIn = {
    body: Joi.object().required().keys({
        userName: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
    }),
};


module.exports = {
    signUp,
    signIn,
};
