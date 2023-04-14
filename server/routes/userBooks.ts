import express, { Request, Response, Router, NextFunction, ErrorRequestHandler } from 'express';
const { userBooksController } = require('../controllers/index');
const router: Router = express.Router();
const { userAuth } = require('../middlewares/auth');
import { asycnWrapper } from '../lib/index';

router.get('/books/:id', userAuth, async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id },
  } = req;

  const user = userBooksController.getUserBooks(id);
  const [err, data] = await asycnWrapper(user);
  if (err) return next(err);
  res.json(data);
});

router.patch('/books/:bookId',userAuth ,async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  const { newShelf, newRate, newReview } = req.body;
// edit to object 
  try {
    const updatedBooks = await userBooksController.updateUserBooks({userId: req.user._id, bookId, newShelf, newRate, newReview});
    res.json(updatedBooks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
