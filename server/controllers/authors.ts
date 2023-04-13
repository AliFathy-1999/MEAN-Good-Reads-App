const Authors = require('../DB/models/author');
const Books = require('../DB/models/book');
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
const getPopularAuthors = () => {
  return Books.aggregate([
    {
      $match: {
        ratingsNumber: { $gt: 0 },
      },
    },
    {
      $project:{
        _id: 1,
        firstName: 1, 
        lastName: 1, 
        authorImg: 1,
        authorId:1,
        avgRating: {  $divide: ['$totalRating', '$ratingsNumber'],},
        totalRating: 1,   
        ratingsNumber: 1,             
    }
    },
    {
      $sort: { avgRating: -1 },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: 'authors',
        localField: 'authorId', 
        foreignField: '_id',
        as: 'author'
      }
    },
    {
      $group:{
        _id:"$author._id",
        authors:{$addToSet:"$author"}
      }
    },{
      $project:{
        _id:0,
        authors:1
      }
    }

  ])
  }

module.exports = {
    createAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor,
    singleAuthor,
    getPopularAuthors
}