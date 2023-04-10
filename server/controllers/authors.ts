const Authors = require('../DB/models/author');
const Books = require('../DB/models/book');
import { Author } from "../DB/schemaInterfaces";

const createAuthor = (data:Author) => Authors.create(data)

const getAuthors = (limit:number,pageNumber:number) :Author => Authors.find({}).skip((pageNumber - 1) * limit).limit(limit); 

const updateAuthor = (id:number,data:Author) => Authors.findOneAndUpdate({_id:id},data,{new:true});

const deleteAuthor = (id:number) => Authors.findOneAndDelete({_id:id});

const singleAuthor = (id:number) :Author => {
  return Books
  .find({authorId:id})
  .select("name bookImage ratingsNumber averageRating")
  // return Books.aggregate([
  //   {$lookup: {
  //     From: 'Authors',
  //     LocalField: '_id',
  //     foreignField: 'authorId',
  //     as: 'Author_Books'
  //   },{
  //     $limit:1
  //   }}
  // ]);
  // .populate({ path: 'authorId', select: 'firstName lastName authorImg bio' });

} 
module.exports = {
    createAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor,
    singleAuthor
}