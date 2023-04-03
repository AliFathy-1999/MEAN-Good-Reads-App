import express, { Request, Response, Router, NextFunction } from 'express';
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req:Request, file:any, cb:any){
        let imagePath :string= ""
        switch(file.fieldname){
            case "pImage":
                imagePath = "../client/src/assets/profile-imgs"
                break;
            case "authorImg":
                imagePath = "../client/src/assets/author-imgs"
                break;
            case "bookImage":
                    imagePath = "../client/src/assets/books-imgs"
                break;
            default:
                imagePath = "../client/src/assets/random-imgs"
        }
        cb(null, imagePath)
    },
    
    
    filename: function(req:any,file:any, cb:any){
        const { body: { userName,firstName,lastName } } = req;
        let uniqueName :string= ""
        
        switch(file.fieldname){
                case "pImage":
                    uniqueName = userName
                    break;
                case "authorImg":
                    uniqueName = `${firstName}-${lastName}`
                    break;
                case "bookImage":
                    uniqueName = `${firstName}-${lastName}`
                    break;
                default:
                    uniqueName = `${Date.now()}`
        }
        
        let fileN = file.originalname;
        const ext = path.extname(file.originalname);
        if(ext == '.tiff' || ext == '.jpeg')
        {
            fileN = fileN.slice(0, -5); 
        }
        else{
            fileN = fileN.slice(0, -4);
        }
        const myFileName = `${uniqueName}-${fileN}${path.extname(file.originalname)}`
        cb(null, myFileName)
    }
})
const upload= multer ({
    storage,
    limits:{
        fileSize:1024 * 1024 * 5, // 5MB
    },
    fileFilter: function (req:any, file:any, cb:any) {
        try{
        const ext = path.extname(file.originalname);
        const extAllowed = [".png",".jpg",".tiff",".jpeg"]
        const disallowedExts:number = extAllowed.findIndex((myExt:string)=> myExt != ext )
            if(disallowedExts == -1) {       
                return cb(new Error('Only images are allowed'))
            }
                cb(null, true)
            }catch(e){
                return cb(true,null)
            }
    },
})

export { upload }