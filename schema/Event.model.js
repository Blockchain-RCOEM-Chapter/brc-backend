import mongoose  from "mongoose";

const EventSchema = new mongoose.Schema({
    EventBrochure: { type: String, required: true },
    EventId: { type: String, required: true },
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Date: { type: Date, required: true },
    Time: { type: String, required: true },
    Venue: { type: String, required: true },
});


export default mongoose.model("Event", EventSchema);;