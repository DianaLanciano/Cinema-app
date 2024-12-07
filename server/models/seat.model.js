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
    status: { 
        type: String, 
        enum: ['available', 'locked', 'booked'],
        default: 'available'
    },
    lockedAt: {
        type: Date
    },
    lockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
