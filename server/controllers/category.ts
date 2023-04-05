import { ObjectId } from "mongoose";
import { Category , PaginatedCategories } from "../DB/schemaInterfaces";
const Categories = require('../DB/models/category');

const create = (data:Category) => Categories.create(data) 

const getCategories = ()=> Categories.find({});

const getPaginatedCategories = async (options: { page: number; limit: number }): Promise<PaginatedCategories> => {    
    if (!options.limit) options.limit = 10;
    const result = (await Categories.paginate({}, options)) as PaginatedCategories;
    return result as PaginatedCategories;
  };

const editCategory = (data:{id:number, name:string})=> Categories.findByIdAndUpdate(data.id, { name: data.name }, {new:true});

const deleteCategory = (id:ObjectId)=> Categories.findByIdAndDelete(id);

module.exports = {
    create,
    getCategories,
    getPaginatedCategories,
    editCategory,
    deleteCategory
}