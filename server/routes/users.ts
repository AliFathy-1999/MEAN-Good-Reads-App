import express, { Request, Response, Router, NextFunction, ErrorRequestHandler } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
const { userController } = require('../controllers/index');
const { upload } = require('../middlewares/imageMiddleware');
const router: Router = express.Router();
import { asycnWrapper } from '../lib/index';
const userValidation = require('../Validations/userValidation');
const { userAuth } = require('../middlewares/auth');
const { usersValidator } = require('../Validations');
const { validate } = require('../middlewares/validation');

router.post("/register",upload.single('pImage'),userValidation,async (req:any,res:Response, next:NextFunction) => {
    let pImage = "https://cdn-icons-png.flaticon.com/128/3899/3899618.png"   
    const userError : Result<ValidationError>= validationResult(req)
    if(req.file)
       pImage = `../../../assets/profile-imgs/${req.file.filename}`
      const { body: { firstName, lastName, userName, email, password, role } } = req;   
      const user = userController.create({firstName,lastName,userName, email, password,pImage,role});
      const [err, data] = await asycnWrapper(user);
      if(!userError.isEmpty()) return next({ err: userError.array()[0].msg });
      if(err) return next(err);
      res.status(200).json({"message":"User registered successfully"});  
         
})

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
router.get('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
  const {params: { id },} = req;
  console.log(id);

  const user = userController.getUserBooks(id);
  const [err, data] = await asycnWrapper(user);
  console.log(data);
  if (err) return next(err);
  res.json(data);
})
  // router.get('/books/:id', userAuth,async (req:Request, res:Response, next:NextFunction) => {
  //     const { params: { id } } = req;   
  //     const user = userController.getUserBooks(id);
  //     const [err, data] = await asycnWrapper(user);
  //     console.log(err);
      
  //     console.log(data);
  //     if(err) return next(err);
  //     res.json(data)
  // });

module.exports = router;
