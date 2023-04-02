import {Schema,model} from 'mongoose';
const validator = require('validator');
import { User,Role } from "../schemaInterfaces"
const bcryptjs = require('bcryptjs');

const schema = new Schema<User>({
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
    userName:{
        type:String,
        minLength:[3,"Username must be at least 3 characters"],
        maxLength:[30,"Username must be at less than 30 characters"],
        required:[true, "Username is a required field"],
        trim:true,
        unique:true,        
    },
    email:{
        type:String,
        required:[true, "Email is a required field"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is a required field"],
        trim:true,
        minlength:[6,"Password must be at least 6 characters"],
        match:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
        //@iti43OS
        validate(value:string){
            if(value.includes("password")){
                throw new Error("Password cannot contain 'password'")
            }else if(!value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/)){
                throw new Error("Password must contain at least one number , Capital letter and one special character")
            }
        },
    },  
    pImage:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
    },
    role:{
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    }
},{
    timestamps:true
})
schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject.role;
    return userObject;
}
schema.pre("save",async function(){
    if(this.isModified("password"))
        this.password = await bcryptjs.hash(this.password,10);
})



schema.methods.verifyPassword = function verifyPassword(pass: string) {
    return bcryptjs.compareSync(pass, this.password);
  };
  
const User = model('Users', schema);
  
module.exports = User;
  
export { User };

