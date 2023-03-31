import { Request, Response, NextFunction } from "express"
import { Role } from "../DB/schemaInterfaces";


const jwt = require('jsonwebtoken');
const Users = require('../DB/models/user');

const userAuth = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await Users.findOne({userName: decoded.userName});
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};


const adminAuth = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await Users.findOne({userName: decoded.userName});
      if (user.role !== Role.ADMIN) throw new Error('unauthorized-User');
      req.user = user;      
      next();      
    } catch (err) {
      next(err);
    }
  };


module.exports = {userAuth, adminAuth};
