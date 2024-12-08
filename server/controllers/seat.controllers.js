import { lockSeats } from '../middleware/seatLock.middleware.js';
import Seat from '../models/seat.model.js';

export const handleSeatLock = async (req, res) => {
    try {
        const { seatIds, userId } = req.body;
        
        if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
            return res.status(400).json({ error: 'Invalid seat selection' });
        }

        await lockSeats(seatIds, userId);
        
        res.status(200).json({ 
            message: 'Seats locked successfully',
            lockedUntil: new Date(Date.now() + 10 * 60 * 1000)
        });
    } catch (error) {
        console.error('Seat locking error:', error);
        res.status(400).json({ 
            error: error.message || 'Failed to lock seats' 
        });
    }
};

export const getSeatStatus = async (req, res) => {
    try {
        const { showtimeId } = req.params;
        
        if (!showtimeId) {
            return res.status(400).json({ error: 'Showtime ID is required' });
        }

        const seats = await Seat.find({ showtime: showtimeId })
            .select('seatNumber status') // Only get these fields
            .lean();  // Added for better performance - Convert to plain JavaScript object (faster)
            
        res.status(200).json(seats);
    } catch (error) {
        console.error('Get seat status error:', error);
        res.status(500).json({  // Changed to 500 for server errors
            error: 'Failed to get seat status' 
        });
    }
};