import mongoose from "mongoose";

const seatSchema = mongoose.Schema({
    showtime: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Showtime', 
        required: true 
    }, 
    seatNumber: { 
        type: String, 
        required: true 
    }, 
    isBooked: { 
        type: Boolean, 
        default: false 
    },
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
