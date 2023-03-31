import express, {Application, NextFunction, Request, Response , ErrorRequestHandler} from 'express';
import { Multer,StorageEngine,DiskStorageOptions } from 'multer'
const multer = require('multer')
const app : Application = express();
const cors = require("cors");
const routes = require("./routes/index.ts")
require("./DB/connects")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use('/users', routes.userRoute);
const errorHandler: ErrorRequestHandler = (err, req:Request, res:Response, next:NextFunction) => {
    res.status(400).send({
        apiStatus:false,
        message:err.message
    });
};
app.use(errorHandler);
module.exports = app;