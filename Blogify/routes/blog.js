const {Router}=require("express");
const multer=require('multer');
const path=require("path");
const{handleAddNewBlog,handleIndiviualBlog,handleIndividualComment}=require("../controllers/blog");

const router=Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName=`${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    },
  })
  
const upload = multer({ storage: storage })
  



router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    })
});
router.post("/",upload.single("coverImage"),handleAddNewBlog);
router.get("/:id",handleIndiviualBlog);

router.post("/comment/:blogId",handleIndividualComment);

module.exports=router; 