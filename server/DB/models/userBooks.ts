import mongoose, { Schema, model } from 'mongoose';
import {  Shelf } from '../schemaInterfaces';


const schema = new Schema(
  {
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
    },

    books: {
        type: [
          {
            bookId: {
              type: Number,
              ref: 'Books',
            },
            shelf: {
              type: String,
              enum: Object.values(Shelf),
              default: Shelf.WANT2READ,
            },
            rating:{
              type:Number,
              default:0
            }
          },
        ],
      },
  },
);

const UserBooks = model('UserBooks', schema);
module.exports = UserBooks;
export { UserBooks };
