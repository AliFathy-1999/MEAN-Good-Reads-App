import express, {Request, Response , Router,NextFunction, ErrorRequestHandler} from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
const { userController } = require("../controllers/index")
const {upload} = require("../middlewares/imageMiddleware")
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');
const Users = require('../DB/models/user');
const usersValidator  = require('../Validations');
const userValidation  = require('../Validations/userValidation');
const { validate } = require('../middlewares/validation');
const { userAuth } = require('../middlewares/auth');


router.post("/register",upload.single('pImage'),userValidation,async (req:any,res:Response, next:NextFunction) => {
    let pImage = "https://cdn-icons-png.flaticon.com/128/3899/3899618.png"   
    const userError : Result<ValidationError>= validationResult(req)
    if(req.file)
       pImage = `../../../client/src/assets/profile-imgs/${req.file.filename}`
      const { body: { firstName, lastName, userName, email, password, role } } = req;   
      const user = userController.create({firstName,lastName,userName, email, password,pImage,role});
      const [err, data] = await asycnWrapper(user);
      if(err) return next({ err: userError.array()[0].msg });
      res.status(200).json({"message":"User registered successfully"});  
         
})

router.post('/signin', validate(usersValidator.signIn) ,async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { body: { userName, password } } = req;
      console.log(req.body);
      const token = await userController.signIn({userName, password});
      res.cookie('token',token).status(201).json({ token });
    } catch (err) {
      next(err);
    }
  });

  router.get('/', userAuth ,async (req:Request, res:Response, next:NextFunction) => {
    try {
      res.status(201).json({user: req.user});
    } catch (err) {
      next(err);
    }
  });
module.exports = router;