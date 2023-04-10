const jwt = require('jsonwebtoken');
import { Types } from 'mongoose';
import { User, UserBooks } from '../DB/schemaInterfaces';
const Users = require('../DB/models/user');
import { AppError, asycnWrapper } from '../lib/index';

let mongoose = require('mongoose');
const createToken = (user: User) => {
  const token = jwt.sign({ userName: user.userName }, process.env.TOKEN_KEY, { expiresIn: '7d' });
  return token;
};

const create = (data: User) => Users.create(data);

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
