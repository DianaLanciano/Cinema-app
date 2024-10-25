import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
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
    releaseDate: { 
        type: Date, 
        required: true 
    }, 
    rating: { 
        type: String, 
        required: true 
    }, 
    posterUrl: String, 
    createdAt: { 
        type: Date, 
        default: Date.now },
    ticketPrice: { 
        type: Number, 
        required: true 
    },
    isVisible: {
        type: Boolean,
        default: true,
        require: true
    }

    
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
