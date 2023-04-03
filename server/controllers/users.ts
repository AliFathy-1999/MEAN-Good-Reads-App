const jwt = require('jsonwebtoken');
import { User} from "../DB/schemaInterfaces";
const Users = require('../DB/models/user');



const generateUserId = async () => {
  const usersNumber = await Users.count({});
  if (!usersNumber) {
    return 1;
  }
  const lastuser = await Users.find({}).sort('-createdAt').limit(1);
  return lastuser[0]._id + 1;
};

const createToken = (user:User) => {
  const token = jwt.sign({ userName: user.userName }, process.env.TOKEN_KEY, { expiresIn: '7d' });
    return token;
  };
  
  

const create = (data:User) => Users.create(data) 

const signIn = async ( loginedUser:{ userName: string, password:string } ) => {
    const user = await Users.findOne({ userName: loginedUser.userName});
    if (!user) throw new Error('un-authenticated');
    const valid = user.verifyPassword(loginedUser.password);
    if (!valid) throw new Error('un-authenticated');
    return createToken(user);
  };

module.exports = {
    create,signIn,
}