import express, {Request, Response , Router,NextFunction} from 'express';
const { categoriesController } = require("../controllers/index");
const { categoriesValidator } = require('../Validations');
const { validate } = require('../middlewares/validation');
const { adminAuth } = require('../middlewares/auth');
const asycnWrapper = require('../lib/index');

const router : Router = express.Router();

router.post("/", adminAuth, validate(categoriesValidator.categoryData), async (req: Request, res: Response, next: NextFunction) => {
    const category = categoriesController.create({ name: req.body.name });
    const [err, data] = await asycnWrapper(category);
    if (err) return next(err);
    res.status(201).json({ success: true, data });
  }
  );
  
  
router.get('/:page/:limit', adminAuth, async (req: Request, res: Response, next: NextFunction) => {
    const {page, limit } = req.params;    
    const categories = categoriesController.getPaginatedCategories({page, limit });
    const [err, data] = await asycnWrapper(categories);
    if (err) return next(err);
    res.status(200).json({ success: true, data, resullt: data.length });
  }
  );
  
router.patch("/:id", adminAuth, validate(categoriesValidator.categoryId), validate(categoriesValidator.categoryData), async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = categoriesController.editCategory({ id, name });
    const [err, data] = await asycnWrapper(category);
    if (err) return next(err);
    if (!data) return next(new Error (`No Category with ID ${req.params.id}`));
    res.status(200).json({ success: true, data });
  }
  
  );
  
router.delete("/:id", adminAuth, validate(categoriesValidator.categoryId), async (req: Request, res: Response, next: NextFunction) => {
      const deletedCategory = categoriesController.deleteCategory(req.params.id);
      const [err, data] = await asycnWrapper(deletedCategory);
      if (err) return next(err);
      if (!data) return next(new Error (`No Category with ID ${req.params.id}`));
      return res.status(204).end();
    }
  );
  
module.exports = router;
  