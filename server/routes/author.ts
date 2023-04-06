
import express, {Request, Response , Router,NextFunction} from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { AppError, asycnWrapper } from '../lib/index';
const {upload} = require("../middlewares/imageMiddleware")
const { authorController } = require("../controllers/index")
const router : Router = express.Router();
const { adminAuth } = require('../middlewares/auth');
 const { Counter } = require("../DB/models/index")
 const authorValidation  = require('../Validations/author');
router.post('/',adminAuth ,upload.single("authorImg"),authorValidation.validAddedAuthor , async (req:Request, res:Response, next:NextFunction) => {
    const authorError : Result<ValidationError> = validationResult(req);
    let authorImg = "https://cdn-icons-png.flaticon.com/128/3899/3899618.png" 
    if(req.file)
      authorImg = `../../../assets/author-imgs/${req.file.filename}`
    const incrementalId = await Counter.findOneAndUpdate(
        {id:"authorInc"},
        { $inc: { seq: 1 } },
        { new: true}
      );
    let _id;    
    if(incrementalId == null) {
        Counter.create({id:"authorInc",seq:1})
        _id=1
    }else{
        _id = incrementalId.seq;
    }
    const { body:{ firstName, lastName, DOB , bio } } = req; 
    const author = authorController.createAuthor({ _id , firstName, lastName, DOB, bio, authorImg});
    const [err, data] = await asycnWrapper(author);
    if(err) return next({ err: authorError.array()[0]?.msg });
    res.status(200).json({message:"Author Added successfully"});
  });  

  router.patch('/:id',adminAuth,upload.single("authorImg"), authorValidation.validEditedAuthor,async (req:Request, res:Response, next:NextFunction) => {
    let authorImg :any; 
    if(req.file)
      authorImg = `../../../assets/author-imgs/${req.file.filename}`
    const { params:{ id }} = req 
    const { body:{ firstName, lastName, bio, DOB } } = req; 
    const authorError : Result<ValidationError> = validationResult(req);
    const author = authorController.updateAuthor(id,{  firstName, lastName, bio, DOB, authorImg});
    let [err, data] = await asycnWrapper(author);
    // if (!authorError.isEmpty()) return next({ err: authorError.array()[0]?.msg });
    if (!authorError.isEmpty()) return next( new AppError(authorError.array()[0]?.msg , 422));
    if (err) return next(err);
    if (!data) return next(new AppError (`No Author with ID ${req.params.id}`, 400)); 
    res.status(200).json({message:"Author updated successfully"});
  });  


  router.get('/:pageNumber/:limit', adminAuth ,authorValidation.validatePagination, async (req:Request, res:Response, next:NextFunction) => { 
    const { params:{ limit,pageNumber }} = req 
    const author = authorController.getAuthors(+limit,+pageNumber);
    const [err, data] = await asycnWrapper(author);
    const authorError : Result<ValidationError> = validationResult(req);
    // if (!authorError.isEmpty()) return next({ err: authorError.array()[0]?.msg });
    if (!authorError.isEmpty()) return next( new AppError(authorError.array()[0]?.msg , 422));
    if (err) return next(err);
    res.status(200).json(data);
  });  
  router.delete('/:id', adminAuth ,authorValidation.checkvalidID, async (req:Request, res:Response, next:NextFunction) => { 
    const authorError : Result<ValidationError> = validationResult(req);
    const { params:{ id }} = req 
    const author = authorController.deleteAuthor(id);
    let [err, data] = await asycnWrapper(author);
    // if (!authorError.isEmpty()) return next({ err: authorError.array()[0]?.msg });
    if (!authorError.isEmpty()) return next( new AppError(authorError.array()[0]?.msg , 422));
    if (err) return next(err);
    if (!data) return next(new AppError (`No Author with ID ${req.params.id}`, 400)); 
    res.status(200).json({message:"Author deleted successfully"});
  });  
  router.get('/:id', adminAuth ,authorValidation.checkvalidID, async (req:Request, res:Response, next:NextFunction) => { 
    const authorError : Result<ValidationError> = validationResult(req);
    const { params:{ id }} = req 
    const author = authorController.singleAuthor(id);
    let [err, data] = await asycnWrapper(author);
    // if (!authorError.isEmpty()) return next({ err: authorError.array()[0]?.msg });
    if (!authorError.isEmpty()) return next( new AppError(authorError.array()[0]?.msg , 422));
    if (err) return next(err);
    if (!data) return next( new AppError (`No Author with ID ${req.params.id}`, 400)); 
    res.status(200).json(data);
  }); 

module.exports = router;