import { Book, PaginatedBooks } from '../DB/schemaInterfaces';
const Books = require('../DB/models/book');

const create = (data: Book) => Books.create(data);

const getBooks = () => Books.find({});

// Admin Panel
const getBookById = (_id: number) => Books.findById(_id).select('-averageRating -ratingsNumber -reviews');

// User View
const getBookById_fullInfo = (_id: number) => Books.getBookById(Number(_id));

const editBook = (data: { _id: number; newValues: object }) => 
  Books.findByIdAndUpdate(data._id, { ...data.newValues }, { new: true });

const  editBookReviews = (data: { _id: number; newValues: object }) => 
  Books.editReviews({_id: data._id, ...data.newValues });

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
  getBookById_fullInfo,
  editBook,
  editBookReviews,
  deleteBook,
  getPaginatedBooks,
};