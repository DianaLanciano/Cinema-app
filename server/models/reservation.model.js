import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
    required: true,
  },
  seatsBooked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true,
    },
  ],
  totalSeatsAmount: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Price,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
