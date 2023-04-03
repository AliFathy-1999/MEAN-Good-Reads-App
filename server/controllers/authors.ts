const Authors = require('../DB/models/author');
import { Author } from "../DB/schemaInterfaces";

const createAuthor = (data:Author) => Authors.create(data)

const getAuthors = (limit:number,pageNumber:number) :Author => Authors.find({}).skip(pageNumber * limit).limit(limit); 

const updateAuthor = (id:number,data:Author) => Authors.findOneAndUpdate({_id:id},data,{new:true});

const deleteAuthor = (id:number) => Authors.findOneAndDelete({_id:id});

const singleAuthor = (id:number) :Author => Authors.findOne({_id:id});

module.exports = {
    createAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor,
    singleAuthor
}