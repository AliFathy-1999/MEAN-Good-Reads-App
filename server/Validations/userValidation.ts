import { Request } from "express";
import { Role } from "../DB/schemaInterfaces";

const { body, validationResult } = require('express-validator');
const User = require('../DB/models/user');

const userValidation = [
    body('firstName')
    .isLength({ min: 3, max: 15 }).withMessage('First name must be between 3 and 15 characters')
    .notEmpty().withMessage(' First name is a required field')
    .trim(),

    body('lastName')
    .isLength({ min: 3, max: 15 }).withMessage('Last name must be between 3 and 15 characters')
    .notEmpty().withMessage(' Last name is a required field')
    .trim(),

    body('userName')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .notEmpty().withMessage(' Username is a required field')
    .trim()
    .custom(async (value:string) => {
        const user = await User.findOne({ userName: value });
        if (user) {
          throw new Error(' Username is already in use');
        }
    }),
    body('email')
    .isEmail().withMessage('Invalid email')
    .notEmpty().withMessage('Email is a required field')
    .normalizeEmail()
    .custom(async (value:string) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error(' Email is already in use');
        }
    }),
    
    body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/).withMessage(' Password must contain at least one number, capital letter, and one special character')
    .not().contains('password').withMessage('Password cannot contain the word "password"'),
    body('confirmPassword').custom((value:string, req:Request ) => {
      if (value !== body('password')) {
        throw new Error('Password must be matched with the confirm password !!!');
      }
      return true;
    }),
]

module.exports = userValidation ;
