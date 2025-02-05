import { Router } from "express";
import { userLogin,userLogout,userSignup,getUserData, updateUserProfile, getAllMovies, getOneMovie, getCityByState, getTheatresInCity} from "../controllers/user.controllers.js";

const router=Router();


router.get("/test",(req,res)=>{
res.send("welcome to auth/test  route");

});

router.post("/login",userLogin);
router.post("/signup",userSignup);
router.get("/logout",userLogout);
router.post("/getuserdata",getUserData);
router.put("/updateprofile",updateUserProfile);
router.get("/media/movies",getAllMovies);
router.get('/movie/:id',getOneMovie);
// router.post('/addcity',addCity);
router.get('/state/:state',getCityByState);

//get theatres by city name
router.get('/city/theatre/:city',getTheatresInCity);

export default router;