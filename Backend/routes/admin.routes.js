import { Router } from "express";
import movieRoutes from "./movie.routes.js"
import theatreRoutes from "./theatre.routes.js"
import showRoutes from './show.routes.js'
const router=Router();

router.get("/",(req,res)=>{
    res.send("welcome to admin route");
})

//movie routes
router.use("/movie",movieRoutes);

export default router;

//theatre routes
router.use("/theatre",theatreRoutes);

//show routes
router.use("/show",showRoutes);