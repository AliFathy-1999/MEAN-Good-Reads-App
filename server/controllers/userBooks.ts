const Users = require('../DB/models/user');
const Books = require('../DB/models/book');

const UserBooks = require('../DB/models/userBooks');
import { AppError, asycnWrapper, trimText } from '../lib/index';

const getUserBooks = async (user: string) =>
  await UserBooks.find({ user: user }).populate({
    path: 'book.bookId',
    select: 'name bookImage authorId averageRating ratingsNumber',
    populate: {
      path: 'authorId',
      select: 'firstName lastName',
    },
  });

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

const updateUserBooks = async (data: {
  userId: string;
  bookId: number;
  shelf: string;
  rating?: number;
  review?: string;
}) => {
  let previousRating = 0;
  const filter = { user: data.userId, 'book.bookId': data.bookId };
  if(data.review) data.review = trimText(data.review)
  const existingBookUpdate = {
    $set: {
      'book.shelf': data.shelf,
      'book.rating': data.rating,
      'book.review': data.review,
    },
  };

  const options = { setDefaultsOnInsert: true, upsert: true, rawResult: true };

  const updatedExistingBook = await UserBooks.findOneAndUpdate(filter, existingBookUpdate, options);

  if (updatedExistingBook.lastErrorObject.updatedExisting) {
    previousRating = updatedExistingBook.value.book.rating;
  }

  if (data.rating) updateAvgRating(data.bookId, data.rating, previousRating);

  return updatedExistingBook;
};

module.exports = {
  getUserBooks,
  updateUserBooks,
};
