import express, {Application, NextFunction, Request, Response , ErrorRequestHandler} from 'express';
// import { Multer,StorageEngine,DiskStorageOptions } from 'multer'
const multer = require('multer')
const app : Application = express();
const cors = require("cors");
const routes = require("./routes/index.ts")
require("./DB/connects")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use('/users', routes.userRoute);
app.use('/admin', routes.adminRoute);

const errorHandler: ErrorRequestHandler = (err, req:Request, res:Response, next:NextFunction) => {
    let errMsg = err.message
    let attributeName : string= ""
    if(err.message.includes('username' && 'duplicate'))
        errMsg = "Username already in use"
    else if((err.message.includes('email' && 'duplicate')))
        errMsg = "Email already in use"
    res.status(400).send({message:errMsg});     
        
};

app.use(errorHandler);
module.exports = app;