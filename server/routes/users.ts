import express, { Request, Response, Router, NextFunction, ErrorRequestHandler } from 'express';
const { userController } = require('../controllers/index');
const { upload } = require('../middlewares/imageMiddleware');
const router: Router = express.Router();
import { asycnWrapper } from '../lib/index';
const { userAuth } = require('../middlewares/auth');
const { usersValidator } = require('../Validations');
const { validate } = require('../middlewares/validation');
const { authorValidator,paginationOptions } = require('../Validations');
const { authorController } = require("../controllers/index")
router.post(
  '/register',
  upload.single('pImage'),
  validate(usersValidator.signUp),
  async (req: any, res: Response, next: NextFunction) => {
    const pImage = req.file?.path;
    const {
      body: { firstName, lastName, userName, email, password, role },
    } = req;
    console.log(role);
    
    const user = userController.create({ firstName, lastName, userName, email, password, pImage, role });
    const [err, data] = await asycnWrapper(user);
    if (err) return next(err);
    res.status(200).json({ message: 'User registered successfully',data });
  });

router.post('/signin', validate(usersValidator.signIn), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { userName, password },
    } = req;
    const token = await userController.signIn({ userName, password });
    // res.cookie('token',token, { httpOnly: true }).status(200).json({ token });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

router.get('/', userAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ user: req.user });
  } catch (err) {
    next(err);
  }
});
router.get('/authors',userAuth,async (req:Request, res:Response, next:NextFunction) => { 
  const { query:{ limit,page }} = req 
  const author = authorController.getAuthors({page,limit});
  const [err, data] = await asycnWrapper(author);
  if (err) return next(err);
  res.status(200).json(data);
});
// router.get('/authors/popular',async (req:Request, res:Response, next:NextFunction) => {  
//   const author = authorController.getPopularAuthors();
//   const [err, data] = await asycnWrapper(author);
//   if (err) return next(err);
//   res.status(200).json(data);
// }); 
module.exports = router;
