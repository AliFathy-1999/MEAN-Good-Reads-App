import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';
import { validationschema } from './validationSchema';
import { AppError } from '../lib/appError';

const validate = (schema: validationschema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationErr: ValidationError[] = [];
    (['body', 'params', 'query'] as (keyof validationschema)[]).forEach((key) => {
      if (schema[key]) {
        const validation = schema[key]!.validate(req[key]);
        if (validation.error) {
          validationErr.push(validation.error);
        }
      }
    });
    if (validationErr.length) {
      // res.status(400).json({ message: 'validation error', validationErr: validationErr[0].details[0].message });
      return new AppError(validationErr[0].details[0].message, 400);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
};

module.exports = { validate };
