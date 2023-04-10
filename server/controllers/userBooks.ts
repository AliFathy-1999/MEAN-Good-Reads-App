import { User, UserBooks } from '../DB/schemaInterfaces';
const Users = require('../DB/models/user');
import { AppError, asycnWrapper } from '../lib/index';
import { Types } from 'mongoose';

// Get All user Book's
const getUserBooks = async (userId: string) => {
  console.log();

  const user = await getUserById(userId);
  await populateUserBooks(user);

  const books = mapUserBooks(user);

  const userData = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    image: user.pImage,
    books: books,
  };
  return userData;
};

const getUserById = async (userId: String) => {
  const userPromise = Users.findById(userId);
  const [userErr, user] = await asycnWrapper(userPromise);
  if (userErr || !user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

const populateUserBooks = async (user: UserBooks) => {
  const populateBooks = user.populate({
    path: 'books.book',
    select: 'name bookImage authorId averageRating ratingsNumber',
    populate: {
      path: 'authorId',
      select: 'firstName lastName',
    },
  });

  const [populateErr] = await asycnWrapper(populateBooks);
  if (populateErr) {
    throw new AppError('Error while populating books', 500);
  }
};

const mapUserBooks = (user: any) => {
  return user.books.map((book: any) => {
    return {
      bookId: book.book._id,
      name: book.book.name,
      cover: book.book.bookImage,
      author: `${book.book.authorId.firstName} ${book.book.authorId.lastName}`,
      rating: book.book.ratingsNumber,
      averageRating: book.book.averageRating,
    };
  });
};

// Update rate and status
const updateBook = async (userId: string, bookId: string, newRate: number, newShelf: string) => {
  const user = await getUserById(userId);

  const book = await user.books.find((book: any) => book.book.toString() === bookId.toString());
  console.log(book);

  if (!book) {
    throw new Error("Book not found in user's list");
  }

  book.rate = newRate;

  book.shelve = newShelf;
  await user.save();

  return {
    bookId: book.book._id,
    name: book.book.name,
    cover: book.book.bookImage,
    author: `${book.book.authorId.firstName} ${book.book.authorId.lastName}`,
    rating: book.book.ratingsNumber,
    averageRating: book.book.averageRating,
  };
};

module.exports = {
  getUserBooks,
  updateBook,
};
