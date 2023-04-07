import { Schema, model, ObjectId, Types } from 'mongoose';
import { Book, BookModel, review } from '../schemaInterfaces';
import mongoosePaginate from 'mongoose-paginate-v2';
import { AppError, trimText } from '../../lib';
import NextFunction from 'express';

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
  // if (!this.ratingsNumber) this.averageRating = 0;
  // this.averageRating = Math.floor(sum / this.ratingsNumber);
  // console.log(this.averageRating);
  // this.save();
  return sum;
}).set(function () {
  this.averageRating = Math.floor(this.totalRating / this.ratingsNumber);
});

schema.plugin(mongoosePaginate);

schema.statics.getBookById = async function (_id: Number) {
  return await Books.findById(_id)
    .populate({ path: 'authorId', select: ['firstName', 'lastName'] })
    .populate({ path: 'categoryId', select: "categoryId._id" })
    .populate({ path: 'reviews.user', select: ['firstName', 'lastName'] })
    .exec()
    .then((data) => data)
    .catch((err) => err);
};


schema.statics.editReviews = async function (data: { _id: Number; userId: ObjectId; comment: string; rating: number }) {
  let book = await Books.findOne({ _id: data._id });

  if (!book) {
    throw new AppError(`No book with ID ${data._id}`, 400);
  }

  let bookWithReview = await Books.findOneAndUpdate(
    { _id: data._id, 'reviews.user': data.userId },
    { $set: { 'reviews.$.comment': trimText(data.comment), 'reviews.$.rating': data.rating } },
    { new: true }
  );

  if (!bookWithReview) {
    bookWithReview = await Books.findOneAndUpdate(
      { _id: data._id },
      {
        $push: { reviews: { comment: data.comment, user: data.userId, rating: data.rating } },
        $inc: { ratingsNumber: 1 },
      },
      { new: true }
    );
    return bookWithReview;
  }
  return bookWithReview;
};

schema.pre('save', { document: true, query: true }, async function () {
  if (this.isNew) {
    this._id = await Books.getNewId();
  }
  console.log('after update');
  if (this.isModified('totalRating')) {
    if (!this.ratingsNumber) this.averageRating = 0;
    this.averageRating = Math.floor(this.totalRating / 5 / this.ratingsNumber);
  } 
});

// schema.pre('findOneAndUpdate', async function () {
//   console.log('hi');
//   const doc = await this.model.findOne(this.getQuery());
//   console.log(doc);
//   if (!doc.ratingsNumber) doc.averageRating = 0;
//   else doc.averageRating = Math.floor((doc.totalRating/5 / doc.ratingsNumber));
//   doc.save();
// }); 

const Books = model<Book, BookModel>('Books', schema);

module.exports = Books;

export { Books };
