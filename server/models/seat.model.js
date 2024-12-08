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

// Add index here, before creating the model
seatSchema.index({ status: 1, lockedAt: 1 });//  The index creates a separate sorted list like this:
//it will iterate 
// status    | lockedAt           | document_id
// -----------------------------------------
// available | null               | id1
// available | null               | id2
// locked    | 2024-12-07T09:00  | id3   // MongoDB jumps directly here!
// locked    | 2024-12-07T10:00  | id4
// pending   | ***********       | id5  // MongoDB stops here!


const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
