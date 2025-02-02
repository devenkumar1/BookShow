import {Router} from 'express';
const router=Router();
import {addShow,updateShow,deleteShow} from '../controllers/show.controllers.js';
import { checkAdmin } from '../middleware/checkadmin.middleware.js';
router.post('/add',checkAdmin,addShow);
router.put('/update/:id',checkAdmin,updateShow);
router.delete("/delete/:id",checkAdmin,deleteShow);



export default router;