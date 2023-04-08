import Joi from 'joi'
;
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
        id: Joi.number().required(),
    })
}

const bookEdit = {
    body: Joi.object().keys({
        name: Joi.string().trim().min(3).max(30),
        authorId: Joi.number(),
        categoryId: Joi.number(),
        description: Joi.string().trim().min(30).max(200),
        reviews: Joi.object().keys({
            user: Joi.number().required(),
            comment: Joi.string().trim().min(3).max(140).required(),
        }).min(1)
    }),
}


const bookReview = {
    body: Joi.object().keys({
            comment: Joi.string().trim().min(3).max(140),
            rating: Joi.number().min(1).max(5)
        }).min(1),
    }


module.exports = {
    bookData,
    bookId,
    bookEdit,
    bookReview,
};