const { body, validationResult , param } = require('express-validator');
const Author = require('../DB/models/author')
const checkvalidID = [
  param('id').isInt().withMessage('Invalid ID')
  .custom(async (value:number) =>{
    const author = await Author.findOne({ _id: value})
    if(!author){
      throw new Error("Invalid Id, no such author with this Id")
    }
    return true
    }),
]
const validAddedAuthor = [
    body('firstName')
    .isLength({ min: 3, max: 15 }).withMessage('First name must be between 3 and 15 characters')
    .notEmpty().withMessage('First name is a required field')
    .trim(),

    body('lastName')
    .isLength({ min: 3, max: 15 }).withMessage('Last name must be between 3 and 15 characters')
    .notEmpty().withMessage('Last name is a required field')
    .trim(),

    body('bio')
    .isLength({ min: 30, max: 300 }).withMessage('Bio must be between 30 and 300 characters')
    .trim(),

    body('DOB')
    .notEmpty().withMessage('Date of Birth is a required field')
    .isDate().withMessage('Date of Birth must be a valid date')
    .custom((value:Date) => {
      if(new Date(value) >= new Date(31,12,2010) ){
        throw new Error("Date of birth is invalid, Author Birth date year must be less than 2010")
    }
      return true;
    }),
]
const validEditedAuthor = [
  checkvalidID,
    body('firstName')
    .isLength({ min: 3, max: 15 }).withMessage('First name must be between 3 and 15 characters')
    .notEmpty().withMessage('First name is a required field')
    .trim(),

    body('lastName')
    .isLength({ min: 3, max: 15 }).withMessage('Last name must be between 3 and 15 characters')
    .notEmpty().withMessage('Last name is a required field')
    .trim(),

    body('bio')
    .isLength({ min: 30, max: 300 }).withMessage('Bio must be between 30 and 300 characters')
    .trim(),

    body('DOB')
    .notEmpty().withMessage('Date of Birth is a required field')
    .isDate().withMessage('Date of Birth must be a valid date')
    .custom((value:Date) => {
      if(new Date(value).getFullYear() > 2010 ){
        throw new Error("Date of birth is invalid, Author Birth date year must be less than or equal 2010")
    }
      return true;
    }),
]
const validatePagination = [
  param('pageNumber')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page number should be a positive integer'),
    param('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit should be a positive integer between 1 and 100'),
]
module.exports = {
  validAddedAuthor,
  validEditedAuthor,
  checkvalidID,
  validatePagination
} ;
