import mongoose, { Schema, model } from 'mongoose';
import {  Shelve } from '../schemaInterfaces';


const schema = new Schema(
  {
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
    },

    books: {
        type: [
          {
            rating: Number,
            book: {
              type: Number,
              ref: 'Books',
            },
            shelve: {
              type: String,
              enum: Object.values(Shelve),
              default: Shelve.WANT2READ,
            },
          },
        ],
      },
  },
);


const UserBooks = model('UserBooks', schema);
module.exports = UserBooks;
export { UserBooks };
