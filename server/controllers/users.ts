const jwt = require('jsonwebtoken');
import mongoose, { Types } from 'mongoose';
import { User } from '../DB/schemaInterfaces';
const Users = require('../DB/models/user');
import { AppError } from '../lib/index';
import { Books } from '../DB/models/book';
const ObjectId = mongoose.Types.ObjectId;

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

// const getUserBooks = (userId: Types.ObjectId) => {
//   console.log(userId);
//   let user: any | undefined;
//   try {
//     user = Users.findById({ _id: userId });
//     // .populate({
//     //   path: 'books.book',
//     //   select: 'name author ratings',
//     // })
//     // .exec();
//   } catch (err) {
//     console.log(err);
//   }
//   console.log(user);

//   if (!user) {
//     console.log('user not found');
//   }

//   return {
//     userId: user?._id,
//     firstName: user?.firstName,
//     lastName: user?.lastName,
//     name: `${user?.firstName} ${user?.lastName}`,
//     pImage: user?.pImage,
//     books: user?.books,
//   };
// };

const getUserBooks = (_id: Types.ObjectId) => Users.findOne({ _id: new mongoose.Types.ObjectId(_id) });

module.exports = {
  create,
  signIn,
  getUserBooks,
};
