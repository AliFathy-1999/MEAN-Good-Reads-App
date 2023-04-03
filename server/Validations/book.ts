import Joi, { number } from 'joi';

const bookData = {
    body: Joi.object().keys({
        name: Joi.string().trim().min(3).max(30).required(),
        authorId: Joi.number().required(),
        categoryId: Joi.number().required(),
        description: Joi.string().trim().min(30).max(200)
    }),
};


const bookId = {
    params: Joi.object().keys({
        id: Joi.number(),
    })
}

const bookEdit = {
    body: Joi.object().keys({
        name: Joi.string().trim().min(3).max(30),
        authorId: Joi.number(),
        categoryId: Joi.number(),
        description: Joi.string().trim().min(30).max(200)
    }),
}

const booksRetrive = {
    params: Joi.object().keys({
        page:Joi.number().min(1).required(),
        limit:Joi.number().min(1).required()
    })
    
}


module.exports = {
    bookData,
    bookId,
    bookEdit,
    booksRetrive
};
