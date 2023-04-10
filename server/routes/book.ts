import express, { Request, Response, Router, NextFunction } from 'express';
const { booksController, authorController } = require('../controllers/index');
import { AppError, asycnWrapper } from '../lib/index';
const { validate } = require('../middlewares/validation');
const {  userAuth } = require('../middlewares/auth');
const { booksValidator , paginationOptions } = require('../Validations');

const router: Router = express.Router();


router.get('/', validate(paginationOptions), async (req: Request, res: Response, next: NextFunction) => {
  const {page, limit } = req.query;    
  const book = booksController.getBooks_fullInfo({page, limit});
  const [err, data] = await asycnWrapper(book);
  if (err) return next(err);
  res.status(200).json({ success: true, data, result: data.length });
  });
  

router.get('/popular',  async (req: Request, res: Response, next: NextFunction) =>{
  const books = booksController.getPopularBooks();
  const [err, data] = await asycnWrapper(books);
  console.log(data);
  if (err) return next(err);
  res.status(200).json({ success: true, data });
})  


router.get('/auth', async (req: Request, res: Response, next: NextFunction) =>{
  const authors = authorController.getPopularAuthors();
  const [err, data] = await asycnWrapper(authors);
  if (err) return next(err);
  res.status(200).json({ success: true, data });
})  

router.get('/:id', validate(booksValidator.bookId), async (req: Request, res: Response, next: NextFunction) => {
const book = booksController.getBookById_fullInfo(req.params.id);
const [err, data] = await asycnWrapper(book);
console.log('data',data);
if (err) return next(err);
if (!data) return next(new AppError (`No book with ID ${req.params.id}`, 400)); 
res.status(200).json({ success: true, data });
});


router.use(userAuth)

router.patch('/:id', validate(booksValidator.bookId), validate(booksValidator.userBookUpdate), async (req: Request, res: Response, next: NextFunction) => {
  const{ shelf, rating, comment } = req.body 
  console.log({ shelf, rating, comment });
  const book = booksController.updateBooks({bookId:req.params.id, review:{ rating, comment}, shelf, userId:req.user._id});
  const [err, data] = await asycnWrapper(book);
  if (err) return next(err);
  if (!data) return next(new AppError (`No book with ID ${req.params.id}`, 400)); 
  res.status(200).json({ success: true, data });
  });
  

// User Review & Rate
router.post('/:id/reviews', validate(booksValidator.bookId), validate(booksValidator.bookReview),  async (req: Request, res: Response, next: NextFunction) => {
const { comment, rating } = req.body;
const book = booksController.addBookReview({ bookId: req.params.id , comment, rating , userId: req.user._id});
const [err, data] = await asycnWrapper(book);
if(!data) return next(new AppError (`User already reviewed the book`, 400)); 
if (err) return next(err);
res.status(200).json({ success: true, data });
});


router.patch('/:id/reviews', validate(booksValidator.bookId), validate(booksValidator.bookReview),  async (req: Request, res: Response, next: NextFunction) => {
  const { comment, rating } = req.body;
  const book = booksController.editBookReviews({ bookId: req.params.id , comment, rating , userId: req.user._id});
  const [err, data] = await asycnWrapper(book);
  console.log(data);
  // if(!data) return next(new AppError (`User already reviewed the book`, 400)); 
  if (err) return next(err);
  res.status(200).json({ success: true, data });
});

module.exports = router;
