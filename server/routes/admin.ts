import express, {Request, Response , Router,NextFunction} from 'express';
const { userController } = require("../controllers/index")
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');
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


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5hZGFlenphdCIsImlhdCI6MTY4MDI4MDQwMywiZXhwIjoxNjgwODg1MjAzfQ.knQBb3exc3g5b7j9nGAJ--EpNI1OZxqu4oOrz-TPprc"

/* {
  "firstName": "Test",
  "lastName": "Aauthorization",
  "userName": "testauth",
  "password":"Aauthoriz*12",
  "email": "testAuthUser@gamil.com",
  "pImage": "https://cdn-icons-png.flaticon.com/128/3899/3899618.png",
  "role": "user"
}*/

// 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3RhdXRoIiwiaWF0IjoxNjgwMjgzNDcxLCJleHAiOjE2ODA4ODgyNzF9.UyLHWbxzeiexymFeA9MDEOY-uyluMSIFxBiLEPF1wxc"
