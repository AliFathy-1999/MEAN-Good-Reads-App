import express, {Request, Response , Router,NextFunction} from 'express';
const {upload} = require("../middlewares/imageMiddleware")
const { userController, authorController } = require("../controllers/index")
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');
const { usersValidator } = require('../Validations');
const { validate } = require('../middlewares/validation');
const { adminAuth } = require('../middlewares/auth');
 const { Authors,Counter } = require("../DB/models/index")

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

  router.post('/addauthor', adminAuth ,upload.single("authorImg"), async (req:Request, res:Response, next:NextFunction) => {
    let authorImg = "https://cdn-icons-png.flaticon.com/128/3899/3899618.png" 
    if(req.file)
      authorImg = `../../../client/src/assets/author-imgs/${req.file.filename}`
    const incrementalId = await Counter.findOneAndUpdate(
        {id:"autherInc"},
        { $inc: { seq: 1 } },
        { new: true}
      );
    let _id;    
    if(incrementalId == null) {
        Counter.create({id:"autherInc",seq:1})
        _id=1
    }else{
        _id = incrementalId.seq;
    }
    const { body:{ firstName, lastName, DOB } } = req; 
    const author = authorController.createAuthor({ _id , firstName, lastName, DOB, authorImg});
    const [err, data] = await asycnWrapper(author);
    if (err) return next(err);
    res.status(200).json(data);
  });  
  router.patch('/updateauthor/:id', adminAuth ,upload.single("authorImg"), async (req:Request, res:Response, next:NextFunction) => {
    let authorImg :any; 
    if(req.file)
      authorImg = `../../../client/src/assets/author-imgs/${req.file.filename}`
    const { params:{ id }} = req 
    const { body:{ firstName, lastName, DOB } } = req; 
    const author = authorController.updateAuthor(id,{  firstName, lastName, DOB, authorImg});
    let [err, data] = await asycnWrapper(author);
    if(data == null) 
      data = {message:"Author not found"};
    if (err) return next(err);
    res.status(200).json(data);
  });  
  router.get('/authors/:pageNumber/:limit', adminAuth , async (req:Request, res:Response, next:NextFunction) => { 
    const { params:{ limit,pageNumber }} = req 
    const author = authorController.getAuthors(+limit,+pageNumber);
    const [err, data] = await asycnWrapper(author);
    if (err) return next(err);
    res.status(200).json(data);
  });  
  router.get('/author/:id', adminAuth , async (req:Request, res:Response, next:NextFunction) => { 
    const { params:{ id }} = req 
    const author = authorController.singleAuthor(id);
    let [err, data] = await asycnWrapper(author);
    if(data == null) 
      data = {message:"Author not found"};
    else if (err) return next(err);
    res.status(200).json(data);
  });  

module.exports = router;
