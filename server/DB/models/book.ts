import { Schema, model, ObjectId } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { Book, BookModel } from '../schemaInterfaces';
import { AppError } from '../../lib';

const Categoris = require('./category');
const Authors = require('./author');

const schema = new Schema<Book>(
  {
    _id: {
      type: Number,
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
      unique: true,
      trim: true,
    },

    categoryId: {
      type: Number,
      required: true,
      ref: 'Categories',
    },
    authorId: {
      type: Number,
      required: true,
      ref: 'Authors',
    },

    bookImage: {
      type: String,
      default: 'https://res.cloudinary.com/dttgbrris/image/upload/v1681003634/3899618_mkmx9b.pngs',
    },
    description: {
      type: String,
      minlength: 30,
      maxlength: 200,
    },
    ratingsNumber: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          comment: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 140,
          },

          user: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
          },

          rating: {
            type: Number,
            required: true,
            default:0
          },
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Retrieve Book Data Selection
schema.methods.toJSON = function () {
  const book = this;
  const bookObject = book.toObject();
  delete bookObject.__v;
  // delete bookObject.createdAt;
  // delete bookObject.updatedAt;
  delete bookObject.totalRating;
  return bookObject;
};

schema.plugin(mongoosePaginate);

// Get new Incremental ID For Book Document
schema.statics.getNewId = async () =>
  await Books.find({})
    .sort('-createdAt')
    .limit(1)
    .then((lastBook) => (lastBook[0] ? lastBook[0]._id + 1 : 0));

// schema.statics.getNewId = async () =>
// await Books.findByIdAndUpdate(0, { $inc: { count: 1 } }, { new: true }).then((countDoc: any) =>  countDoc? countDoc.count : 0 ) ;

schema.virtual('totalRating').get(function () {
  if (!this.reviews?.length) return 0;
  const sum = this.reviews.reduce((acc, cur) => acc + cur.rating.valueOf(), 0);
  return sum;
});

schema.virtual('averageRating').get(function () {
  if (this.ratingsNumber === 0) return 0;
  return Math.floor(this.totalRating / this.ratingsNumber);
});

// Validate Author and Category IDs Related to each Book entry
schema.statics.checkReferenceValidation = async (references: { categoryId: number; authorId: number }) => {
  const relatedCategory = await Categoris.findById(references.categoryId);
  const relatedAuthor = await Authors.findById(references.authorId);
  if (!(relatedAuthor && relatedCategory)) return new AppError("Category or Author isn't valid", 422);
  return
};


// Set Incremantal Id pre saving document
schema.pre('save', { document: true, query: true }, async function () {
  if (this.isNew) {
    this._id = await Books.getNewId();
  }
});

const Books = model<Book, BookModel>('Books', schema);

module.exports = Books;
