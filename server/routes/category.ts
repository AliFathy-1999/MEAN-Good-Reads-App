import express, { Request, Response, Router, NextFunction } from "express";
const { categoriesController } = require("../controllers/index");
const asycnWrapper = require("../lib/index");
const { validate } = require("../middlewares/validation");
const { adminAuth } = require("../middlewares/auth");
const { categoriesValidator } = require("../Validations");

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const categories = categoriesController.getCategories();
    const [err, data] = await asycnWrapper(categories);
    if (err) return next(err);
    res.status(200).json({ success: true, data, resullt: data.length });
  }
);

module.exports = router;
