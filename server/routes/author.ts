
import express, {Request, Response , Router,NextFunction} from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { AppError, asycnWrapper } from '../lib/index';
const { authorController } = require("../controllers/index")
const router : Router = express.Router();
const { userAuth } = require('../middlewares/auth');
 const authorValidation  = require('../Validations/author');
 const Authors = require('../DB/models/author')
 
  router.get('/:id', userAuth ,authorValidation.checkvalidID, async (req:Request, res:Response, next:NextFunction) => { 
    const authorError : Result<ValidationError> = validationResult(req);
    const { params:{ id }} = req 
    const author = await Authors.findOne({_id:id}).select('firstName lastName authorImg bio');
    const authorBooks = authorController.singleAuthor(id);
    let [err, data] = await asycnWrapper(authorBooks);
    if (!authorError.isEmpty()) return next( new AppError(authorError.array()[0]?.msg , 422));
    if (err) return next(err);
    if (!data) return next( new AppError (`No Author with ID ${req.params.id}`, 400)); 
    res.status(200).send({author,authorBooks:data});
  }); 

module.exports = router;