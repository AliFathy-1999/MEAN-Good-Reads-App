const jwt = require('jsonwebtoken');
import { Types } from 'mongoose';
import { User } from '../DB/schemaInterfaces';
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

export const getUserBooks = async (userId: string) => {
  const userPromise = Users.findById(userId);
  const [userErr, user] = await asycnWrapper(userPromise);

  if (userErr || !user) {
    throw new AppError('User not found', 404);
  }

  // Populate user's books with author information
  const populateBooks = user.populate({
    path: 'books.book',
    select: 'name bookImage authorId averageRating',
    populate: {
      path: 'authorId',
      select: 'firstName lastName',
    },
  });
  const [populateErr] = await asycnWrapper(populateBooks);

  if (populateErr) {
    throw new AppError('Error while populating books', 500);
  }

  const books = user.books.map((book: any) => {
    return {
      bookId: book.book._id,
      name: book.book.name,
      cover: book.book.bookImage,
      author: `${book.book.authorId.firstName} ${book.book.authorId.lastName}`,
      rating: book.book.averageRating,
    };
  });

  const averageRating =
    user.books.reduce((acc: any, book: any) => {
      return acc + book.book.averageRating;
    }, 0) / user.books.length;

  const userData = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    image: user.pImage,
    books: books,
    averageRating: averageRating,
  };
  return userData;
};

module.exports = {
  create,
  signIn,
  getUserBooks,
};
