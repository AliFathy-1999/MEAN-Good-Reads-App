import express, {Request, Response , Router,NextFunction, ErrorRequestHandler} from 'express';
const { userController } = require("../controllers/index")
const {upload} = require("../middlewares/imageMiddleware")
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');
const Users = require('../DB/models/user');
const { usersValidator } = require('../Validations');
const { validate } = require('../middlewares/validation');



router.post("/register",upload.single('pImage'),async (req:any,res:Response, next:NextFunction) => {
    try {
      const pImage = `../../../client/src/assets/profile-imgs/${req.file.filename}`
      const { body: { firstName, lastName, userName, email, password,confirmPassword, role } } = req;   
      if(password !== confirmPassword){
        throw new Error(`Password must be matched with the confirm password !!!`)
      } 
      const user = userController.create({firstName,lastName,userName, email, password,pImage,role});
      res.status(200).json(user);      
    } catch (err) {
      if (err) return next(err);
    }

})


router.post('/signin', validate(usersValidator.signIn) ,async (req:Request, res:Response, next:NextFunction) => {
    const { body: { userName, password } } = req;
    try {
      const token = await userController.signIn({userName, password});
      res.cookie('token',token).status(201).json({ token });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;