import express, { Request, Response, Router, NextFunction } from "express";
const { categoriesController } = require("../controllers/index");
import { AppError, asycnWrapper } from '../lib/index';
const { validate } = require("../middlewares/validation");
const { categoriesValidator, paginationOptions } = require("../Validations");

const router: Router = express.Router();


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const categories = categoriesController.getCategories();
  const [err, data] = await asycnWrapper(categories);
  if (err) return next(err);
  res.status(200).json({ success: true, data, resullt: data.length });
}
);

router.get('/:id', validate(paginationOptions), async (req: Request, res: Response, next: NextFunction) => {
  const {page, limit } = req.query;    
  const books = categoriesController.getCategoyBooks(req.params.id, {page, limit});
  const [err, data] = await asycnWrapper(books);
  if (err) return next(err);
  res.status(200).json({ success: true, data, resullt: data.length });
}
);


module.exports = router;
