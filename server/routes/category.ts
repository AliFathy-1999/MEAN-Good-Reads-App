import express, { Request, Response, Router, NextFunction } from "express";
const { categoriesController } = require("../controllers/index");
import { AppError, asycnWrapper } from '../lib/index';
const { validate } = require("../middlewares/validation");
const { categoriesValidator } = require("../Validations");

const router: Router = express.Router();

router.get('/:page/:limit', async (req: Request, res: Response, next: NextFunction) => {
  const {page, limit } = req.params;    
  const categories = categoriesController.getPaginatedCategories({page, limit });
  const [err, data] = await asycnWrapper(categories);
  if (err) return next(err);
  res.status(200).json({ success: true, data, resullt: data.length });
}
);

module.exports = router;
