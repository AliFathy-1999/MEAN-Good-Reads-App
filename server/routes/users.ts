import express, {Request, Response , Router,NextFunction} from 'express';
const { userController } = require("../controllers/index")
const {upload} = require("../middlewares/imageMiddleware")
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');
const Users = require('../DB/models/user');
 
router.post("/register",upload.single('pImage'),async (req:any,res:Response, next:NextFunction) => {
    const pImage = `../../client/src/assets/profile-imgs/${req.file.filename}`
    const { body: { firstName, lastName, username, email, password, role } } = req;    
    const user = userController.create({firstName,lastName,username, email, password,role});
    const [err, data] = await asycnWrapper(user);
    if (err) return next(err);
    res.status(200).json(data);
})
module.exports = router;