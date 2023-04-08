import Joi from 'joi';
const User = require('../DB/models/user');
// const signUp = {
//     body: Joi.object().required().keys({
//         firstName: Joi.string()
//             .min(3).max(15)
//             .required().messages({
//                 'string.empty': 'First name is a required field',
//                 'string.min': 'First name must be at least 3 characters',
//                 'string.max': 'First name must be at most 15 characters',
//             }),
        
//         lastName: Joi.string()
//         .required().messages({
//             'string.empty': 'Last name is a required field',
//             'string.min': 'Last name must be at least 3 characters',
//             'string.max': 'Last name must be at most 15 characters',
//         }),

//         email: Joi.string()
//         .email().message('Invalid email')
//         .required().messages({
//             'string.empty': 'Email is a required field',
//             'string.email': 'Invalid email',
//         })
//         .custom(async (value:string) => {
//             const user = await User.findOne({ email: value });
//             if (user) {
//               throw new Error('Email is already in use');
//             }
//         }),
//         userName: Joi.string()
//         .min(3).max(30)
//         .required().messages({
//             'string.empty': 'User name is a required field',
//             'string.min': 'User name must be at least 3 characters',
//             'string.max': 'Last name must be at most 30 characters',
//         })
//         .custom(async (value:string) => {
//                 const user = await User.findOne({ userName: value });
//                 if (user) {
//                   throw new Error(' Username is already in use');
//                 }
//         }),
        
//         password: Joi.string().
//         required().message('Password is a required field')
//         .min(3).message('Passsword must be at least 6 characters')
//         .pattern(new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*_]')).message("Password must contain at least one number , Capital letter and one special character")
//         .custom((value:string) => {
//             if (value.includes('password')) {
//               throw new Error("Password cannot contain 'password'");
//             }
//             return value;
//           }),
//     }),
// };

const signIn = {
    body: Joi.object().required().keys({
        userName: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
    }),
};


module.exports = {
    //signUp,
    signIn,
};
