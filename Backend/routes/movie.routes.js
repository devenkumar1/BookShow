import { addMovie,updateMovie,deleteMovie } from "../controllers/movie.controller.js";
import {Router} from "express";
const router=Router();
import { checkAdmin } from "../middleware/checkadmin.middleware.js";

router.post("/add",checkAdmin,addMovie);
router.put("/update/:id",checkAdmin,updateMovie);
router.delete("/delete/:id",checkAdmin,deleteMovie);

export default router;