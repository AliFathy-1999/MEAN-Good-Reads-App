import mongoose,{ Types } from 'mongoose';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
interface User{
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  userName:string,
  pImage?:string,
  role:Role
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
export { User , Role, Counter, Author}
