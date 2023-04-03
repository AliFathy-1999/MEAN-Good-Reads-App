import { ObjectId } from "mongoose";
import { Category } from "../DB/schemaInterfaces";
const Categories = require('../DB/models/category');

const create = (data:Category) => Categories.create(data) 

const getCategories = ()=> Categories.find({});

const editCategory = (data:{id:number, name:string})=> Categories.findByIdAndUpdate(data.id, { name: data.name }, {new:true});

const deleteCategory = (id:ObjectId)=> Categories.findByIdAndDelete(id);

module.exports = {
    create,
    getCategories,
    editCategory,
    deleteCategory
}
