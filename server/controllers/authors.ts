const Authors = require('../DB/models/author');
const Books = require('../DB/models/book');
import { Promise } from "mongoose";
import { Author,Book, PaginatedBooks } from "../DB/schemaInterfaces";

const createAuthor = (data:Author) => Authors.create(data)

const getAuthors = (options:{limit:number,page:number}) :Author => {
  if (!options.limit) options.limit = 5;
  return Authors.paginate({}, options);
} 

const updateAuthor = (id:number,data:Author) => Authors.findOneAndUpdate({_id:id},data,{new:true});

const deleteAuthor = (id:number) => Authors.findOneAndDelete({_id:id});

const singleAuthor = (id:number, page: number, limit: number ) :Promise<PaginatedBooks> => {
  const selection = 'name bookImage ratingsNumber averageRating reviews';
  if (!limit) limit = 3;
  return Books.paginate({authorId:id}, {limit,page,select:selection})
}
module.exports = {
    createAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor,
    singleAuthor
}