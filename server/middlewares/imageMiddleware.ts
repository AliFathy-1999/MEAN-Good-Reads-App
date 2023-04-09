import express, { Request, Response, Router, NextFunction } from 'express';
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder:async (req:Request,file:any) => {
        let folderName;
        switch(file.fieldname){
            case "pImage":
                folderName = "profile-imgs"
                break;
            case "authorImg":
                folderName = "author-imgs"
                break;
            case "bookImage":
                folderName = "books-imgs"
                break;
            default:
                folderName = `random-imgs`
    }
        return folderName
    },
      allowedFormats: ['jpg', 'jpeg', 'png','tiff'], 
      public_id: async (req:Request, file:any) => {
        const myFileName = `${Date.now()}-${file.originalname}`
        return myFileName;
    },
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    },
  });
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