import express, { Request, Response, Router, NextFunction } from 'express';
const { booksController } = require('../controllers/index');
const { upload } = require('../middlewares/imageMiddleware');
const asycnWrapper = require("../lib/index");
const { validate } = require('../middlewares/validation');
const { adminAuth } = require('../middlewares/auth');
const { booksValidator } = require('../Validations');

const router: Router = express.Router();

router.post('/', adminAuth, validate(booksValidator.bookData), upload.single('bookImage'), async (req: Request, res: Response, next: NextFunction) => {
    let bookImage;
    if (req.file) {
      bookImage = `${process.env.BOOKS_IMAGES + req.file.filename}`;      
    }
    const { name, categoryId, authorId, description } = req.body;
      const book = booksController.create({ name, categoryId, authorId, bookImage, description });
      const [err, data] = await asycnWrapper(book);
      if (err) return next(err);
      res.status(201).json({ success: true, data });
    }
);

router.get('/', adminAuth, validate(booksValidator.booksRetrive), async (req: Request, res: Response, next: NextFunction) => {
    // const books = booksController.getBooks();
    const {page, limit } = req.body
    const books = booksController.getPaginatedBooks({page, limit });
    const [err, data] = await asycnWrapper(books);
    if (err) return next(err);
    res.status(200).json({ success: true, data, resullt: data.length });
  });

  
  router.get('/:id', adminAuth, validate(booksValidator.bookId), async (req: Request, res: Response, next: NextFunction) => {
    const book = booksController.getBookById(req.params.id);
    const [err, data] = await asycnWrapper(book);
    if (err) return next(err);
    res.status(200).json({ success: true, data });
  });

  router.get('/:page/:limit', adminAuth, validate(booksValidator.booksRetrive), async (req: Request, res: Response, next: NextFunction) => {
    // const books = booksController.getBooks();
    const {page, limit } = req.params
    const books = booksController.getPaginatedBooks({page, limit });
    const [err, data] = await asycnWrapper(books);
    if (err) return next(err);
    res.status(200).json({ success: true, data, resullt: data.length });
  });

router.patch('/:id', adminAuth, validate(booksValidator.bookId), validate(booksValidator.bookEdit) , async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  let bookImage;
  if (req.file) {
    bookImage = `${process.env.BOOKS_IMAGES + req.file.filename}`;      
  }
  const { name, categoryId, authorId, description } = req.body;

  const book = booksController.editBook({ id, newValues: { name, bookImage, categoryId, authorId, description } });
  const [err, data] = await asycnWrapper(book);
  if (err) return next(err);
  res.status(200).json({ success: true, data });

});


router.delete('/:id', adminAuth, validate(booksValidator.bookId), async (req: Request, res: Response, next: NextFunction) => {
  const deletedBook =  booksController.deleteBook( req.params.id);
  const [err, data] = await asycnWrapper(deletedBook);
  if (err) return next(err);
  return res.status(204).end();
  });


module.exports = router;
