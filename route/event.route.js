import express from "express";
import { AddEvent, DeleteEvent, GetEvents, UpdateEvent } from "../controller/event.controller.js";
import { uploadBrochure } from "../middleware/eventmulter.js";

const router = express.Router();

router.get("/getevent",GetEvents);
router.post("/addevent",uploadBrochure,AddEvent);
router.patch("/updateevent/:id",uploadBrochure,UpdateEvent);
router.delete("/deleteevent/:id",DeleteEvent); 

export default router