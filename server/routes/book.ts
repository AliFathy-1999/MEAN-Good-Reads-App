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


router.get('/:id', validate(booksValidator.bookId), async (req: Request, res: Response, next: NextFunction) => {
const book = booksController.getBookById_fullInfo(req.params.id);
const [err, data] = await asycnWrapper(book);
if (err) return next(err);
if (!data) return next(new AppError (`No book with ID ${req.params.id}`, 400)); 
res.status(200).json({ success: true, data });
});


module.exports = router;
