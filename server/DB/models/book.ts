import { Schema, model } from 'mongoose';
import { Book, BookModel, Counter } from '../schemaInterfaces';
import mongoosePaginate from "mongoose-paginate-v2";

import { Users } from './user';


const schema = new Schema<Book>(
  {
    _id: {
      type: Number,
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true,
      unique: true,
      trim: true,
    },

    categoryId: {
      type: Number,
      required: true,
    },
    authorId: {
      type: Number,
      required: true,
    },

    bookImage: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/128/3899/3899618.png',
    },
    description: {
      type: String,
      minlength: 30,
      maxlength: 200,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


schema.statics.getNewId = async () => await Books.find({}).sort('-createdAt').limit(1).then((lastBook) => lastBook[0] ? lastBook[0]._id + 1: 0 )

// schema.statics.getNewId = async () =>
  // await Books.findByIdAndUpdate(0, { $inc: { count: 1 } }, { new: true }).then((countDoc: any) =>  countDoc? countDoc.count : 0 ) ; 


schema.statics.getAverageRate = async (id:number) =>
{
  
} 

schema.plugin(mongoosePaginate);


schema.statics.getBooks= async function (_id:number)  {
  return await Books.aggregate([
    { 
      $match:{_id}
    },
    {
      $lookup:{
        from:'Authors',
        localField:'authorId',
        foreignField:'_id',
        as:'authorName',
      }
    },
  ])
}

schema.pre('save', async function () {
  if (this.isNew) {
    this._id = await Books.getNewId();
  }
});



const Books = model<Book, BookModel>('Books', schema);

module.exports = Books;

export { Books };
