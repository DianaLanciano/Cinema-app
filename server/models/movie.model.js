import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
    {
    title: { 
        type: String, 
        required: true, 
        trim: true 
    }, 
    genre: { 
        type: [String], 
        required: true 
    }, 
    runtime: { 
        type: Number, // In minutes 
        required: true 
    }, 
    synopsis: { 
        type: String, 
        required: true 
    }, 
    actors: {
        type: [String],
    },
    releaseDate: { 
        type: Date, 
        required: true 
    }, 
    rating: { 
        type: Number, 
        default: 3 
    }, 
    posterUrl: String, 
    ticketPrice: { 
        type: Number, 
        required: true 
    },
    isVisible: {
        type: Boolean,
        default: true,
        require: true
    }
},
{ timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
