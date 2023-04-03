import {Schema,model} from 'mongoose';
const validator = require('validator');
import { Author } from "../schemaInterfaces"
const bcryptjs = require('bcryptjs');

const schema = new Schema<Author>({
    _id:{
        type:Number,
        required:[true, "id is a required field"],
    },
    firstName:{
        type:String,
        minLength:[3,"First name must be at least 3 characters"],
        maxLength:[15,"First name must be at less than 15 characters"],
        required:[true, "First name is a required field"],
        trim:true,
    },
    lastName:{
        type:String,
        minLength:[3,"Last name must be at least 3 characters"],
        maxLength:[15,"Last must be at less than 15 characters"],
        required:[true, "Last name is a required field"],
        trim:true,
    },
    DOB:{
        type:Date,
        required:[true, "Date of Birth is a required field"],
        validate(value:Date){
            if(value > new Date(2010,12,31) && validator.isDate()){
                throw new Error("Date of birth is invalid")
            }
        },
    },
    history:{
      type:String,
      default:"No description"  
    },
    authorImg:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
    },

},{
    timestamps:true
})

schema.methods.toJSON = function () {
    const author = this;
    const authorObject = author.toObject();
    delete authorObject.__v;
    return authorObject;
}

  
const Author = model('Authors', schema);

module.exports = Author;


