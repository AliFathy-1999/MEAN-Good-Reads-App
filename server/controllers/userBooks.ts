const Users = require('../DB/models/user');
const Books = require('../DB/models/book');

const UserBooks = require('../DB/models/userBooks');
import { AppError, asycnWrapper } from '../lib/index';
import mongoose, { Types } from 'mongoose';

const getUserBooks = async (user: string) => {
  const userBooks = await UserBooks.find({ user: user }).populate({
    path: 'book.bookId',
    select: 'name bookImage authorId averageRating ratingsNumber',
    populate: {
      path: 'authorId',
      select: 'firstName lastName',
    },
  });

  if (!userBooks) {
    throw new AppError('User not found', 404);
  }
  return userBooks;
};

const updateAvgRating = async (bookId: number, rating: number, previousRating: number) => {
  const book = await Books.findById(bookId);
  if (previousRating) {
    book.totalRating = book.totalRating - previousRating + Number(rating);
    console.log(book.totalRating);
  } else {
    book.totalRating = book.totalRating + Number(rating);
    book.ratingsNumber++;
  }
  book.save();
};

const updateUserBooks = async (userId: string, bookId: number, shelf: string, rating?: number, review?: string) => {
  let previousRating = 0;
  userId = userId.trim();

  const filter = { user: userId, 'book.bookId': bookId };
  const existingBookUpdate = {
    $set: {
      'book.shelf': shelf,
      'book.rating': rating,
      'book.review': review,
    },
  };

  const options = { setDefaultsOnInsert: true, upsert: true, rawResult: true };

  const updatedExistingBook = await UserBooks.findOneAndUpdate(filter, existingBookUpdate, options);

  console.log(updatedExistingBook);

  if (updatedExistingBook.lastErrorObject.updatedExisting) {
    previousRating = updatedExistingBook.value.book.rating;
  }

  if (rating) updateAvgRating(bookId, rating, previousRating);

  return updatedExistingBook;
};

module.exports = {
  getUserBooks,
  updateUserBooks,
};
