import Event from "../schema/Event.model.js";
import { nanoid } from "nanoid";

export const AddEvent = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No brochure uploaded!" });
  }
  const { Name, Description, Date, Time, Venue } = req.body;
  const EventId = nanoid(6);
  if (!Name || !Description || !Date || !Time || !Venue) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const event = new Event({
    EventBrochure: `/eventimages/${req.file.filename}`,
    EventId,
    Name,
    Description,
    Date,
    Time,
    Venue,
  });
  await event.save();
  res.status(200).json({ message: "Event added successfully" });
};



export const GetEvents = async (req, res) => {

  const events = await Event.find({});
  res.status(200).json({ message: "Events fetched successfully", events });
};



export const DeleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findOneAndDelete({ EventId: id });
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error deleting event", error);
  }

};



export const UpdateEvent = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Event.findOneAndUpdate({EventId: id}, req.body);
      return res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
      console.log("Error updating event", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
