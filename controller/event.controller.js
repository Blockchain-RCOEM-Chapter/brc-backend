import Event from "../schema/Event.model.js";
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
export const AddEvent=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ error: "No brochure uploaded!" });
    }
    const {Name,Description,Date,Time,Venue}=req.body;
    const EventId=nanoid(6);
    if( !Name || !Description || !Date || !Time || !Venue){
        return res.status(400).json({message:"All fields are required"});
    }    
    const event=new Event({EventBrochure:`/eventimages/${req.file.filename}`,EventId,Name,Description,Date,Time,Venue});
    await event.save();
    res.status(200).json({message:"Event added successfully"});
}

export const GetEvents=async(req,res)=>{
    const events=await Event.find();
    
    res.status(200).json({message:"Events fetched successfully",events});
}

export const DeleteEvent=async(req,res)=>{   
    const {id}=req.params;
    const findevent=await Event.findOne({EventId:id}); 
    if(!findevent){
        return res.status(400).json({message:"Event not found"});
    }
    const brochurePath = path.join("eventimages", path.basename(findevent.EventBrochure));

     
        if (fs.existsSync(brochurePath)) {
            fs.unlinkSync(brochurePath);
        }

   
    
    await Event.findOneAndDelete({EventId:id});
    res.status(200).json({message:"Event deleted successfully"});
}

export const UpdateEvent=async(req,res)=>{
    const {id}=req.params;

    const {Name,Description,Date,Time,Venue}=req.body;
    
    if( !Name || !Description || !Date || !Time || !Venue){
        return res.status(400).json({message:"All fields are required"});
    }
    const findevent=await Event.findOne({EventId:id});
    if(!findevent){
        return res.status(400).json({message:"Event not found"});
    } 
    let updatedBrochure = findevent.EventBrochure;
    if (req.file) {
       
        if (findevent.EventBrochure) {
            const oldFilePath = path.join(process.cwd(), findevent.EventBrochure);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }
        updatedBrochure = `/eventimages/${req.file.filename}`;
    }

    
    await Event.findByIdAndUpdate({_id:findevent._id
    },{EventBrochure:updatedBrochure,Name,Description,Date,Time,Venue});
    res.status(200).json({message:"Event updated successfully"});
}
