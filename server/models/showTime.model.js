import mongoose from "mongoose";

const showTimeSchema = mongoose.Schema({
    movie: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', 
        required: true }, 
    hallNumber: { 
        type: Number, 
        required: true 
    }, 
    showDate: { 
        type: Date, 
        required: true 
    }, 
    showTime: { 
        type: String, // e.g., "14:00" for 2 PM 
        required: true 
    }, 
    seatsAvailable: { 
        type: Number, 
        required: true 
    }, 
    totalSeats: { 
        type: Number, 
        required: true 
    } 
});

const ShowTime = mongoose.model("ShowTime", showTimeSchema);

export default ShowTime;
