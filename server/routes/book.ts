import express, { Request, Response, Router, NextFunction } from 'express';
const { booksController } = require('../controllers/index');
const asycnWrapper = require("../lib/index");
const { validate } = require('../middlewares/validation');
const {  userAuth } = require('../middlewares/auth');
const { booksValidator } = require('../Validations');

const router: Router = express.Router();

router.get('/:id', validate(booksValidator.bookId), async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user);
const book = booksController.getBookById_fullInfo(req.params.id);
const [err, data] = await asycnWrapper(book);
if (err) return next(err);
res.status(200).json({ success: true, data });
});


// User Review & Rate
router.patch('/:id/reviews', userAuth, validate(booksValidator.bookId), validate(booksValidator.bookReview),  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
  const { comment, rating } = req.body;
  const book = booksController.editBookReviews({ _id: req.params.id, newValues: { comment, rating , userId: req.user._id}});
  const [err, data] = await asycnWrapper(book);
  if (err) return next(err);
  res.status(200).json({ success: true, data });

});

module.exports = router;
