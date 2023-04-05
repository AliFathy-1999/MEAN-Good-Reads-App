import { Schema, model } from 'mongoose';
import { Category, categoryModel } from '../schemaInterfaces';
import mongoosePaginate from 'mongoose-paginate-v2';


const schema = new Schema<Category>(
  {
    _id: {
      type: Number,
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

schema.statics.getNewId = async () => await Categoris.find({}).sort('-createdAt').limit(1).then((lastCategory) => lastCategory[0] ? lastCategory[0]._id + 1: 0 )

// schema.statics.getNewId = async () =>
//   await Categoris.findByIdAndUpdate(0, { $inc: { count: 1 } }, { new: true }).then(
//     (countDoc: any) => countDoc?  countDoc.count : 0 );

schema.pre('save', async function () {
  if (this.isNew) {
    this._id = await Categoris.getNewId();
  }
});

const Categoris = model<Category, categoryModel>('Categories', schema);

module.exports = Categoris;

export { Categoris };