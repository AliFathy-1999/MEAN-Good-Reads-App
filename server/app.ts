import express, {Application, NextFunction, Request, Response , ErrorRequestHandler} from 'express';
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
            console.log('Hossam')
module.exports = app;