const {Router}=require("express");
const{handleUserSignUp,handleUserSignIn}=require("../controllers/user");

const router=Router();

router.get("/signin",(req,res)=>{
    res.render("signin");
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.post("/signup",handleUserSignUp);
router.post("/signin",handleUserSignIn);





module.exports=router;