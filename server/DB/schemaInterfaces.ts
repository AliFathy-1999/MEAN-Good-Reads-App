import { Document, Model, Types} from 'mongoose';


enum Role {
  ADMIN = 'admin',
  USER = 'user',
}


enum Shelve {
  READ = 'read',
  READING = 'reading',
  WANT2READ = 'want2read',
}

type review = 
  {
    comment: String,
    user: Types.ObjectId,
    rating:Number,
  }


interface User{
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  userName:string,
  pImage?:string,
  role:Role,
  books?:[{
    book:number,
    shelve:Shelve
  }],
}
interface Book extends Document
{
   _id:number,
  name:string,
  bookImage:string,
  categoryId:number,
  authorId:number,
  totalRating:number,
  averageRating:number,
  ratingsNumber:number,
  description?:string,
  reviews?: review[],
}

interface PaginatedBooks {
  docs: Book[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  nextPage?: number | null;
  prevPage?: number | null;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
}

interface Category extends Document{
  _id:number,
  name:string
}


interface PaginatedCategories {
  docs: Category[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  nextPage?: number | null;
  prevPage?: number | null;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
}


interface counter extends Document{
  _id:number,
  count:number,
}


interface BookModel extends Model<Book> {
  getNewId: () => Promise<number>;
}


interface categoryModel extends Model<Category> {
  getNewId: () => Promise<number>;
}
interface counterModel extends Model<counter> {}

interface Counter{
  id:String,
  seq:Number,
}
interface Author{
  _id:Number,
  authorImg?:string,
  firstName:string,
  lastName:string, 
  history:string, 
  DOB:Date,
}
export { User , Role, Counter, Author, categoryModel, PaginatedBooks, BookModel, Shelve, counterModel, Category , Book , PaginatedCategories, review}
