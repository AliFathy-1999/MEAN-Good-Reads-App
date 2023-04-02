const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req:any, file:any, cb:any){
        cb(null, "../client/src/assets/profile-imgs")
    },
    filename: function(req:any,file:any, cb:any){
        const { body: { userName } } = req;
        let fileN = file.originalname;
        const ext = path.extname(file.originalname);
        if(ext == '.tiff' || ext == '.jpeg')
        {
            fileN = fileN.slice(0, -5); 
        }
        else{
            fileN = fileN.slice(0, -4);
        }
        const myFileName = `${userName}-${fileN}${path.extname(file.originalname)}`
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