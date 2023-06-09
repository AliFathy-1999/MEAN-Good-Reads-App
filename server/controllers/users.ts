const jwt = require('jsonwebtoken');
import { Types } from 'mongoose';
import { User, UserBooks } from '../DB/schemaInterfaces';
const Users = require('../DB/models/user');
import { AppError, asycnWrapper } from '../lib/index';
const userBooks = require("../DB/models/userBooks")
let mongoose = require('mongoose');

const createToken = (user: User) => {
  const token = jwt.sign({ userName: user.userName, userId:user._id }, process.env.TOKEN_KEY, { expiresIn: '14d' });
  return token;
};

const create = (data: User) => {
  return Users.create(data).then((user:any) => {
    const createUserBooks = new userBooks({
      userId:user._id
    })
    createUserBooks.save();
  })
  
};

const signIn = async (loginedUser: { userName: string; password: string }) => {
  const user = await Users.findOne({ userName: loginedUser.userName });
  if (!user) throw new AppError('un-authenticated', 401);
  const valid = user.verifyPassword(loginedUser.password);
  if (!valid) throw new AppError('un-authenticated', 401);
  return createToken(user);
};

module.exports = {
  create,
  signIn,
};
