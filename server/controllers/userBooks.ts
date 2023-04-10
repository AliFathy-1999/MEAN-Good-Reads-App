import { UserBooks } from '../DB/models/userBooks';
// import { User, UserBooksType } from '../DB/schemaInterfaces';
const Users = require('../DB/models/user');
import { AppError, asycnWrapper } from '../lib/index';
import { Types } from 'mongoose';

const getUserById = async (userId: String) => {
  const userPromise = Users.findById(userId);
  console.log('userPromise:', userPromise); // Add this line
  const [userErr, user] = await asycnWrapper(userPromise);
  console.log('userErr:', userErr); // Add this line
  console.log('user:', user); // Add this line
  if (userErr || !user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

const getUserBooks = async (userId: string) => {
  console.log('userId:', userId); // Add this line

  const userBooks = await UserBooks.findOne({ userId }).populate({
    path: 'books.book',
    select: 'name bookImage authorId averageRating ratingsNumber',
    populate: {
      path: 'authorId',
      select: 'firstName lastName',
    },
  });

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
