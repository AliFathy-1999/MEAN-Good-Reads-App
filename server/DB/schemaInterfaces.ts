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
  username:string,
  pImage:string,
  role:Role
}
export { User ,Role}
