import express, {Request, Response , Router,NextFunction} from 'express';
const { userController} = require("../controllers/index")
const router : Router = express.Router();
const { usersValidator } = require('../Validations');
const { validate } = require('../middlewares/validation');
const { adminAuth } = require('../middlewares/auth');

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


  router.get('/', adminAuth ,async (req:Request, res:Response, next:NextFunction) => {
    try {
      res.status(201).json({"user": req.user});
    } catch (err) {
      next(err);
    }
  }); 
 

module.exports = router;
