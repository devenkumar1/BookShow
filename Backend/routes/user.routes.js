import { Router } from "express";
import { userLogin,userLogout,userSignup,getUserData, updateUserProfile, getAllMovies } from "../controllers/user.controllers.js";

const router=Router();


router.get("/test",(req,res)=>{
res.send("welcome to auth/test  route");

});

router.post("/login",userLogin);
router.post("/signup",userSignup);
router.get("/logout",userLogout);
router.post("/getuserdata",getUserData);
router.post("/updateprofile",updateUserProfile);
router.get("/media/movies",getAllMovies);


export default router;