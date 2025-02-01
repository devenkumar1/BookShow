import { addMovie,updateMovie,deleteMovie } from "../controllers/movie.controller.js";
import {Router} from "express";
const router=Router();


router.post("/add",addMovie);
router.put("/update/:id",updateMovie);
router.delete("/delete/:id",deleteMovie);

export default router;