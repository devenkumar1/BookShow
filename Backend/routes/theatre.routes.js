import theatre from "../models/theatre.model.js";
import { addTheatre,updateTheatre,deleteTheatre } from "../controllers/theatre.controllers.js";
import express from 'express'
import Router from "express";
const router=Router();


router.post("add",addTheatre);
router.put("/update/:id",updateTheatre);
router.delete("/delete/:id",deleteTheatre);
export default router;

