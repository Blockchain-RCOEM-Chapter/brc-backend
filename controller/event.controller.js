import Event from "../schema/Event.model.js";
import path from "path";
import fs from "fs";
export const AddEvent=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ error: "No brochure uploaded!" });
    }
    const {Name,Description,Date,Time,Venue}=req.body;

    if( !Name || !Description || !Date || !Time || !Venue){
        return res.status(400).json({message:"All fields are required"});
    }    
    const event=new Event({EventBrochure:`/eventimages/${req.file.filename}`,Name,Description,Date,Time,Venue});
    await event.save();
    res.status(200).json({message:"Event added successfully"});
}

export const GetEvents=async(req,res)=>{
    const events=await Event.find();
    
    res.status(200).json({message:"Events fetched successfully",events});
}

export const DeleteEvent=async(req,res)=>{   
    const {EventId}=req.params;
    const findevent=await Event.findById(EventId); 
    const brochurePath = path.join("eventimages", path.basename(findevent.EventBrochure));

       
        if (fs.existsSync(brochurePath)) {
            fs.unlinkSync(brochurePath);
        }

    if(!findevent){
        return res.status(400).json({message:"Event not found"});
    }

    await Event.findByIdAndDelete(EventId);
    res.status(200).json({message:"Event deleted successfully"});
}

export const UpdateEvent=async(req,res)=>{
    const {EventId}=req.params;
    const {Name,Description,Date,Time,Venue}=req.body;
    
    if( !Name || !Description || !Date || !Time || !Venue){
        return res.status(400).json({message:"All fields are required"});
    }
    const findevent=await Event.findById(EventId);
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

    
    await Event.findByIdAndUpdate(EventId,{EventBrochure:updatedBrochure,Name,Description,Date,Time,Venue});
    res.status(200).json({message:"Event updated successfully"});
}
