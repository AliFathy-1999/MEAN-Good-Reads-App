import { Book, PaginatedBooks } from '../DB/schemaInterfaces';
import { AppError, trimText } from '../lib';
import { ObjectId } from 'mongoose';

const Books = require('../DB/models/book');
const Categoris = require('../DB/models/category');
const Authors = require('../DB/models/author');


const create = async (data: Book) => {
  const relatedCategory = await Categoris.findById(data.categoryId);
  const relatedAuthor = await Authors.findById(data.authorId);
  if (!(relatedAuthor && relatedCategory)) throw new AppError("Category or Author isn't valid", 422);
  return Books.create(data);
};

const getBooks = () => Books.find({});

// Admin Panel
const getBookById = (_id: number) => Books.findById(_id).select('-averageRating -ratingsNumber -reviews');

// User View --->  Get Book with full data Info (Author name - Category name)
const getBookById_fullInfo = (_id: number) =>
  Books.findById(_id)
    .populate({ path: 'authorId', select: 'firstName lastName' })
    .populate({ path: 'categoryId', select: 'name' })
    .populate({ path: 'reviews.user', select: 'firstName lastName userName -_id' })
    .select(' -reviews._id -createdAt -updatedAt -totalRating')
    .exec();

const getBooks_fullInfo = async (options: { page: number; limit: number }) => {
  if (!options.limit) options.limit = 10;
  const result = (await Books.paginate(
    {},
    { ...options, populate: ['authorId', 'categoryId', 'reviews.user'], select:' -reviews._id -createdAt -updatedAt -totalRating ' }
  )) as PaginatedBooks;
  return result as PaginatedBooks;
};

const editBook = async (id:number, data: { name:string, bookImage:string, categoryId:number, authorId:number, description:string }) => {
  const book = await Books.findById(id);
  if (!book) throw new AppError(" Book doesn't exist ", 422);
  const relatedCategory = await Categoris.findById(data.categoryId);
  const relatedAuthor = await Authors.findById(data.authorId);
  if (!(relatedAuthor && relatedCategory)) throw new AppError("Category or Author isn't valid", 422);
   if(data.name) data.name = trimText(data.name);
  return Books.findByIdAndUpdate(id, { ...data }, { new: true });
};

//  Edit Book reviews  add (comment- rate) or update user (comment- rate) them if user already rated
const editBookReviews = async (data: { bookId: number; comment: string; rating: number; userId: ObjectId }) => {

  let book = await Books.findOne({ _id: data.bookId });

  if (!book) {
    throw new AppError(`No book with ID ${data.bookId}`, 400);
  }

  // Remove extra space from any comment
  if (data.comment) data.comment = trimText(data.comment);

  // Update if user already rated
  let bookWithReview = await Books.findOneAndUpdate(
    { _id: data.bookId, 'reviews.user': data.userId },
    { $set: { 'reviews.$.comment': data.comment, 'reviews.$.rating': data.rating } },
    { new: true }
  );

  // Add user Review
  if (!bookWithReview) {
    bookWithReview = await Books.findOneAndUpdate(
      { _id: data.bookId },
      {
        $push: { reviews: { comment: data.comment, user: data.userId, rating: data.rating } },
        $inc: { ratingsNumber: 1 },
      },
      { new: true }
    );
  }
  return bookWithReview;
};

// Books.editReviews({ _id: data._id, ...data.newValues });

const deleteBook = (id: number) => Books.findByIdAndDelete(id);

const getPaginatedBooks = async (options: { page: number; limit: number }): Promise<PaginatedBooks> => {
  if (!options.limit) options.limit = 10;
  const result = (await Books.paginate({}, options)) as PaginatedBooks;
  return result as PaginatedBooks;
};

module.exports = {
  create,
  getBooks,
  getBookById,
  getBooks_fullInfo,
  getBookById_fullInfo,
  editBook,
  editBookReviews,
  deleteBook,
  getPaginatedBooks,
};
