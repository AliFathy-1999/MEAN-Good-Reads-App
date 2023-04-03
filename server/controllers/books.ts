import { Book, PaginatedBooks } from '../DB/schemaInterfaces';
import { number } from 'joi';
const Books = require('../DB/models/book');

const create = (data: Book) => Books.create(data);

const getBooks = () => Books.find({});

const getBookById = () => Books.getBookById();

const editBook = (data: { id: number; newValues: object }) =>
  Books.findByIdAndUpdate(data.id, { ...data.newValues }, { new: true });

const deleteBook = (id: number) => Books.findByIdAndDelete(id);

const getPaginatedBooks = async (options: { page: number, limit: number }): Promise<PaginatedBooks> => {
  if (!options.limit ) options.limit = 10;
  const result = await Books.paginate({}, options) as PaginatedBooks ;
  return result as PaginatedBooks;
}


module.exports = {
  create,
  getBooks,
  getBookById,
  editBook,
  deleteBook,
  getPaginatedBooks,
};

// //  64291966803f5364b301350c
// {
//     "name":"oliverTwist",
//     "categoryId":1,
//     "authorId":2,
//     "image":"llllllll"

// }
