import express from "express";
import { AddEvent, DeleteEvent, GetEvents, UpdateEvent } from "../controller/event.controller.js";
import { uploadBrochure } from "../middleware/eventmulter.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getevent",GetEvents);
router.post("/addevent",auth,uploadBrochure,AddEvent);
router.put("/updateevent/:EventId",auth,uploadBrochure,UpdateEvent);
router.delete("/deleteevent/:EventId",auth,DeleteEvent); 

export default router