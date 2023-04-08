const jwt = require('jsonwebtoken');
import { Types } from "mongoose";
import { User} from "../DB/schemaInterfaces";
const Users = require('../DB/models/user');


const createToken = (user:User) => {
  const token = jwt.sign({ userName: user.userName }, process.env.TOKEN_KEY, { expiresIn: '7d' });
    return token;
  };
  
  
const create = (data:User) => Users.create(data) 

var mongoose = require('mongoose');
// const getUserBooks = (_id:Types.ObjectId)=> {
//   _id = new mongoose.Types.ObjectId(_id);
//   return Users.findOne({_id:new ObjectId(_id)});
// }
const getUserBooks = (_id: Types.ObjectId) => Users.findOne({ _id: new mongoose.Types.ObjectId(_id) });
const signIn = async ( loginedUser:{ userName: string, password:string } ) => {
    const user = await Users.findOne({ userName: loginedUser.userName});
    if (!user) throw new Error('un-authenticated');
    const valid = user.verifyPassword(loginedUser.password);
    if (!valid) throw new Error('un-authenticated');
    return createToken(user);
  };

module.exports = {
    create,signIn,getUserBooks
}