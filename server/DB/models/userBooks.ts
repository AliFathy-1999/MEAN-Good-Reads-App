import mongoose, { Schema, model } from 'mongoose';
import { Shelf } from '../schemaInterfaces';
import { string } from 'joi';
const schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
  },

  book: {
    type: {
      bookId: {
        type: Number,
        ref: 'Books',
      },
      shelf: {
        type: String,
        enum: Object.values(Shelf),
        default: Shelf.WANT2READ,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0,
      },
      review: {
        type: String,
      },
    },
  },
});

const UserBooks = model('UserBooks', schema);
module.exports = UserBooks;
