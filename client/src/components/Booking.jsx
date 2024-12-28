import { useState } from "react";
import { Calendar, Clock, Sofa, CreditCard, Loader, Film } from "lucide-react";
import { motion } from "framer-motion";

const Booking = ({ movie }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example showtimes
  const showtimes = ["14:00", "16:30", "19:00", "21:30"];

  // Example seat layout (6 rows x 8 seats)
  const seatLayout = Array(6)
    .fill()
    .map(() => Array(8).fill("available"));

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-rose-400 mb-8">
          Book Your Tickets
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Movie Info & Selection */}
          <div className="space-y-6">
            {/* Date Selection */}
            <div>
              {/* Movie Selection Dropdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                  <Film className="mr-2 h-5 w-5" />
                  Select Movie
                </h3>
                <select
                  // value={selectedMovie}
                  // onChange={(e) => setSelectedMovie(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 
              text-white focus:outline-none focus:border-rose-500 transition-colors mb-6"
                >
                  <option value="">Select a movie</option>
                  <option value="movie1">The Dark Knight</option>
                  <option value="movie2">Inception</option>
                  {/* Add more movies */}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Select Date
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(Date.now() + 12096e5).toISOString().split("T")[0]
                  } // 14 days from now
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 
              text-white focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>

              {/* Keep the rest of your original design (Time Selection, Seat Selection, etc.) */}
            </div>

            {/* Time Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Select Time
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {showtimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-center transition-colors ${
                      selectedTime === time
                        ? "bg-rose-500 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Seat Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
              <Sofa className="mr-2 h-5 w-5" />
              Select Seats
            </h3>

            {/* Screen */}
            <div className="relative mb-8">
              <div className="h-2 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full mb-1" />
              <p className="text-center text-sm text-gray-400">Screen</p>
            </div>

            {/* Seats */}
            <div className="grid gap-2 mb-8">
              {seatLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                  {row.map((seat, seatIndex) => {
                    const seatId = `${String.fromCharCode(65 + rowIndex)}${
                      seatIndex + 1
                    }`;
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <button
                        key={seatId}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSeats(
                              selectedSeats.filter((id) => id !== seatId)
                            );
                          } else {
                            setSelectedSeats([...selectedSeats, seatId]);
                          }
                        }}
                        className={`w-8 h-8 rounded-t-lg transition-colors ${
                          isSelected
                            ? "bg-rose-500 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 text-sm text-gray-400 mb-8">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-800 rounded-t-sm mr-2" />
                Available
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-rose-500 rounded-t-sm mr-2" />
                Selected
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-600 rounded-t-sm mr-2" />
                Occupied
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300">
                  Selected Seats: {selectedSeats.join(", ")}
                </p>
                <p className="text-gray-300">
                  Total: ${selectedSeats.length * 12}
                </p>
              </div>
              <button
                onClick={() => {
                  /* Handle booking */
                }}
                disabled={loading}
                className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 
                          transition-colors flex items-center disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2" />
                    Book Now
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
