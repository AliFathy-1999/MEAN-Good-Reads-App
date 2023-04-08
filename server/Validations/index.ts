import Joi from 'joi';

const paginationOptions = {
  query: Joi.object().keys({
    page: Joi.number().required().min(1),
    limit: Joi.number().min(1),
  }),
};


module.exports = {
    usersValidator: require('./user'),
    booksValidator: require('./book'),
    categoriesValidator: require('./category'),
    userValidations: require('./userValidation'),
    paginationOptions
  };
  