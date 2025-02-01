import {Router} from 'express';
const router=Router();
import {addShow,updateShow,deleteShow} from '../controllers/show.controllers.js';
router.post('/add',addShow);
router.put('/update/:id',updateShow);
router.delete("/delete/:id",deleteShow);



export default router;