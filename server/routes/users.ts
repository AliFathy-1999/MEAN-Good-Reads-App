import express, {Request, Response , Router,NextFunction} from 'express';
const { userController } = require("../controllers/index")
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');

const Users = require('../DB/models/user');

router.post("/register",async (req:Request,res:Response, next:NextFunction) => {
    const { body: { firstName, lastName, username, email, password, pImage, role } } = req;    
    const user = userController.create({firstName,lastName,username, email, password,pImage,role});
    const [err, data] = await asycnWrapper(user);
    if (err) return next(err);
    res.status(200).json(data);
})
module.exports = router;