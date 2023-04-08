import { Book, PaginatedBooks } from '../DB/schemaInterfaces';
import { AppError } from '../lib';
const Books = require('../DB/models/book');
const Categoris = require('../DB/models/category');

const create = async (data: Book) => {
  const relatedCategory = await Categoris.findById(data.categoryId);
  const relatedAuthor = await Categoris.find({ _id: data.authorId })[0];
  if (!(relatedAuthor && relatedCategory)) throw new AppError("Category or Author isn't valid", 422);
  return Books.create(data);
};

const getBooks = () => Books.find({});

// Admin Panel
const getBookById = (_id: number) => Books.findById(_id).select('-averageRating -ratingsNumber -reviews');

// User View
const getBookById_fullInfo = (_id: number) => Books.getBookById(_id);

const getBooks_fullInfo = async (options: { page: number; limit: number }) => {
  if (!options.limit) options.limit = 10;
  const result = (await Books.paginate(
    {},
    { ...options, populate: ['authorId', 'categoryId', 'reviews.user'] }
  )) as PaginatedBooks;
  return result as PaginatedBooks;
};

const editBook = (data: { _id: number; newValues: object }) =>
  Books.findByIdAndUpdate(data._id, { ...data.newValues }, { new: true });

const editBookReviews = (data: { _id: number; newValues: object }) =>
  Books.editReviews({ _id: data._id, ...data.newValues });

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
