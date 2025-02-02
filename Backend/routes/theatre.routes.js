import theatre from "../models/theatre.model.js";
import { addTheatre,updateTheatre,deleteTheatre } from "../controllers/theatre.controllers.js";
import express from 'express'
import Router from "express";
import { checkAdmin } from "../middleware/checkadmin.middleware.js";
const router=Router();


router.post("add",checkAdmin,addTheatre);
router.put("/update/:id",checkAdmin,updateTheatre);
router.delete("/delete/:id",checkAdmin,deleteTheatre);
export default router;

