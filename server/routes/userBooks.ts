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
  console.log(user);

  const [err, data] = await asycnWrapper(user);
  if (err) return next(err);
  res.json(data);
});

router.patch('/books/:bookId', userAuth, async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  const { newRate, newShelf } = req.body;
  const userId = req.user._id;
  console.log(userId);

  try {
    const updatedBook = await userBooksController.updateBook(userId, bookId, newRate, newShelf);
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
