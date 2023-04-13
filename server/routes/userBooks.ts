import express, { Request, Response, Router, NextFunction, ErrorRequestHandler } from 'express';
const { userBooksController } = require('../controllers/index');
const router: Router = express.Router();
const { userAuth } = require('../middlewares/auth');
import { asycnWrapper } from '../lib/index';

router.get('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id },
  } = req;

  const user = userBooksController.getUserBooks(id);
  const [err, data] = await asycnWrapper(user);
  if (err) return next(err);
  res.json(data);
});

router.patch('/books/:bookId', async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  const { newShelf, newRate, newReview } = req.body;
  const userId = '6435c45d1f5b7be94015b2e4';

  try {
    const updatedBooks = await userBooksController.updateUserBooks(userId, bookId, newShelf, newRate, newReview);
    res.json(updatedBooks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
