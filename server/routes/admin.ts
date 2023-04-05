import express, {Request, Response , Router,NextFunction} from 'express';
const { userController} = require("../controllers/index");
const { usersValidator } = require('../Validations');
const { validate } = require('../middlewares/validation');
const { adminAuth } = require('../middlewares/auth');
const asycnWrapper = require('../lib/index');

const bookRoute = require("./admin_books");
const categoryRoute = require("./admin_category");

const router : Router = express.Router();
router.use('/books', bookRoute);
router.use('/categories', categoryRoute);

router.post('/signin', validate(usersValidator.signIn), adminAuth,async (req:Request, res:Response, next:NextFunction) => {
    const { body: { userName, password } } = req;
    console.log(userName, password); 
    try {
      const token = await userController.signIn({userName, password});
      res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;