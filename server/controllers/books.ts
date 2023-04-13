import { Book, PaginatedBooks } from '../DB/schemaInterfaces';
import { AppError, asycnWrapper, trimText } from '../lib';
import { ObjectId } from 'mongoose';

const Books = require('../DB/models/book');
const Categoris = require('../DB/models/category');
const Authors = require('../DB/models/author');
const Users = require('../DB/models/user');

const getBooks = () => Books.find({});

// Admin Panel

const create = async (data: Book) => {
  const relatedCategory = await Categoris.findById(data.categoryId);
  const relatedAuthor = await Authors.findById(data.authorId);
  if (!(relatedAuthor && relatedCategory)) throw new AppError("Category or Author isn't valid", 422);
  return Books.create(data);
};

const getBookById = (_id: number) => Books.findById(_id); //.select('-averageRating -ratingsNumber -reviews');

const editBook = async (
  id: number,
  data: { name: string; bookImage: string; categoryId: number; authorId: number; description: string }
) => {
  const book = await Books.findById(id);
  if (!book) throw new AppError(" Book doesn't exist ", 422);
  if (data.authorId) {
    const relatedAuthor = await Authors.findById(data.authorId);
    if (!relatedAuthor) throw new AppError(" Author isn't valid", 422);
  }
  if (data.categoryId) {
    const relatedCategory = await Categoris.findById(data.categoryId);
    if (!relatedCategory) throw new AppError("Category isn't valid", 422);
  }
  if (data.name) data.name = trimText(data.name);
  return Books.findByIdAndUpdate(id, { ...data }, { new: true });
};

const deleteBook = (id: number) => Books.findByIdAndDelete(id);

// Users View --->  Get Book with full data Info (Author name - Category name)
const getBookById_fullInfo = (_id: number) =>
  Books.findById(_id)
    .populate({ path: 'authorId', select: 'firstName lastName' })
    .populate({ path: 'categoryId', select: 'name' })
    .populate({ path: 'reviews.user', select: 'firstName lastName userName -_id' })
    //.select(' -reviews._id -createdAt -updatedAt -totalRating')
    .exec();

const getBooks_fullInfo = async (options: { page: number; limit: number }) => {
  if (!options.limit) options.limit = 10;
  const result = (await Books.paginate(
    {},
    {
      ...options,
      populate: ['authorId', 'categoryId', 'reviews.user'],
      select: ' -reviews._id -createdAt -updatedAt -totalRating ',
    }
  )) as PaginatedBooks;
  return result as PaginatedBooks;
};

const addBookReview = async (data: {
  bookId: number;
  comment: string;
  averageRating_offset: number;
  userId: ObjectId;
}) => {
  let book = await Books.findOne({ _id: data.bookId });
  if (!book) throw new AppError(`No book with ID ${data.bookId}`, 400);
  return await Books.findOneAndUpdate(
    { _id: data.bookId, 'reviews.user': { $ne: data.userId } },
    {
      $push: { reviews: { comment: data.comment, user: data.userId } },
      $inc: { ratingsNumber: 1, totalRating: data.averageRating_offset },
    },
    { new: true }
  );
};

const editBookReviews = async (data: {
  bookId: number;
  comment: string;
  averageRating_offset: number;
  userId: ObjectId;
}) => {
  if (data.comment) data.comment = trimText(data.comment);
  const [err, reviewedBook] = await asycnWrapper(addBookReview(data));
  if (err) throw err;
  if (!reviewedBook) {
    if (data.averageRating_offset) {
      return await Books.findOneAndUpdate(
        { _id: data.bookId, 'reviews.user': data.userId },
        {
          $set: { 'reviews.$.comment': data.comment },
          $inc: { totalRating: data.averageRating_offset },
        },
        { new: true }
      );
    }
    return await Books.findOneAndUpdate(
      { _id: data.bookId, 'reviews.user': data.userId },
      {
        $set: { 'reviews.$.comment': data.comment },
      },
      { new: true }
    );
  }
};

const updateBooks = async (data: {
  bookId: number;
  shelf: string;
  userId: ObjectId;
  review: { comment: string; rating: number };
}) => {
  try {
    //  Add book if it isn't in user collection
    let userData = await Users.findOneAndUpdate(
      { _id: data.userId, 'books.bookId': { $ne: data.bookId } },
      { $push: { books: { bookId: data.bookId, rating: data.review.rating, shelf: data.shelf } } }
    ).select({ books: { $elemMatch: { bookId: data.bookId } } });

    if (!userData) {
      userData = await Users.findOneAndUpdate(
        { _id: data.userId, 'books.bookId': data.bookId },
        { $set: { 'books.$.shelf': data.shelf, 'books.$.rating': data.review.rating } }
      ).select({ books: { $elemMatch: { bookId: data.bookId } } });
    }

    if (data.review) {
      let averageRating_offset = 0;
      if (data.review.rating) {
        averageRating_offset = Number(data.review.rating) - (userData.books[0] ? userData.books[0].rating : 0);
      }
      await asycnWrapper(
        editBookReviews({
          bookId: data.bookId,
          comment: data.review.comment,
          averageRating_offset,
          userId: data.userId,
        })
      );
    }
    return userData;
  } catch (err) {
    throw err;
  }
};

const getPaginatedBooks = async (options: { page: number; limit: number }): Promise<PaginatedBooks> => {
  if (!options.limit) options.limit = 10;
  const result = (await Books.paginate({}, options)) as PaginatedBooks;
  return result as PaginatedBooks;
};

const getPopularBooks = async () =>
  await Books.aggregate([
    {
      $match: {
        ratingsNumber: { $gt: 0 },
      },
    },
    {
      $addFields: {
        avgRating: {
          $divide: ['$totalRating', '$ratingsNumber'],
        },
      },
    },

    {
      $sort: { avgRating: -1, ratingsNumber: -1 },
    },

    {
      $limit: 5,
    },
  ]);

module.exports = {
  create,
  getBooks,
  getBookById,
  getBooks_fullInfo,
  getBookById_fullInfo,
  updateBooks,
  addBookReview,
  editBook,
  editBookReviews,
  deleteBook,
  getPaginatedBooks,
  getPopularBooks,
};
