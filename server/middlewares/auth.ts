import { Request, Response, NextFunction } from 'express';
import { Role } from '../DB/schemaInterfaces';

const jwt = require('jsonwebtoken');
const Users = require('../DB/models/user');


const verifyToken = async (bearerToken: string) => {
  bearerToken = bearerToken.split(' ')[1];
  const decoded = jwt.verify(bearerToken, process.env.TOKEN_KEY);
  const user = await Users.findOne({ userName: decoded.userName });
  if(!user) return  new Error('Unauthenticated-User');
  return user;
};

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  let bearerToken = req.headers.authorization;
  try {
    if (!bearerToken) throw new Error('Un-Authenticated');
    const result = await verifyToken(bearerToken);
    req.user = result
    next();
  } catch (err) {
    next(err);
  }
};

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  let bearerToken = req.headers.authorization;
  try {
    if (!bearerToken) throw new Error('Unauthenticated-User');
    const result = await verifyToken(bearerToken);
    if (result.role !== Role.ADMIN) throw new Error('Unauthorized-User');
    req.user = result;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { userAuth, adminAuth };
