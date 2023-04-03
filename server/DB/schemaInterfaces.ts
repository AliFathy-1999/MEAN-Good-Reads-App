import { Document, Model} from 'mongoose';


enum Role {
  ADMIN = 'admin',
  USER = 'user',
}


enum Shelve {
  READ = 'read',
  READING = 'reading',
  WANT2READ = 'want2read',
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
    rating:number,
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
  averageRating:number,
  description?:string,

}

interface counter extends Document{
  _id:number,
  count:number,
}

interface BookModel extends Model<Book> {
  getNewId: () => Promise<number>;
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

interface counterModel extends Model<counter> {}

interface Category extends Document{
  _id:number,
  name:string
}

interface categoryModel extends Model<Category> {
  getNewId: () => Promise<number>;
}
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
export { User , Role, Counter, Author, categoryModel, PaginatedBooks, BookModel, Shelve, counterModel, Category , Book}
