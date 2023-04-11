const Users = require('../DB/models/user');
const UserBooks = require('../DB/models/userBooks');
import { AppError, asycnWrapper } from '../lib/index';
import { Types } from 'mongoose';

const getUserById = async (userId: String) => {
  const userPromise = Users.findOne({ userId: userId });
  console.log('userPromise:', userPromise);
  const [userErr, user] = await asycnWrapper(userPromise);
  console.log('userErr:', userErr);
  console.log('user:', user);
  if (userErr || !user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

const getUserBooks = async (userId: string) => {
  console.log('userId:', userId);

  const userBooks = await UserBooks.findOne({ userId: userId }).populate({
    path: 'books.book',
    select: 'name bookImage authorId averageRating ratingsNumber',
    populate: {
      path: 'authorId',
      select: 'firstName lastName',
    },
  });
  console.log(userBooks);

  if (!userBooks) {
    throw new AppError('User not found', 404);
  }

  const books = userBooks.books.map((book: any) => {
    return {
      bookId: book.book._id,
      name: book.book.name,
      cover: book.book.bookImage,
      author: `${book.book.authorId.firstName} ${book.book.authorId.lastName}`,
      rating: book.rating,
      averageRating: book.book.averageRating,
    };
  });

  const userData = {
    id: userBooks.userId,
    books: books,
  };

  return userData;
};

module.exports = {
  getUserBooks,
  // updateBook,
};
