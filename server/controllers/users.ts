import { User } from "../DB/schemaInterfaces";
const Users = require('../DB/models/user');

const create = (data:User) => Users.create(data) 

module.exports = {
    create,
}