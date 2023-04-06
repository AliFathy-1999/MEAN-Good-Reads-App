import express, {Application, NextFunction, Request, Response , ErrorRequestHandler} from 'express';
import { AppError } from './lib';
const { handleResponseError } = require('./lib/handlingErrors');
const app : Application = express();
const cors = require("cors");

const routes = require("./routes/index.ts")
require("./DB/connects")

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use('/users', routes.userRoute);
app.use('/admin', routes.adminRoute);
app.use('/books', routes.bookRoute);
app.use('/authors', routes.authorRoute);
app.use('/categories', routes.CategoryRoute);

// const errorHandler: ErrorRequestHandler = (err, req:Request, res:Response, next:NextFunction) => {
//     res.status(400).json({message: err.message});      
// };

// app.use(errorHandler);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });
  
app.use(handleResponseError);

module.exports = app;