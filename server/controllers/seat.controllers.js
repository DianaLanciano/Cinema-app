import { lockSeats } from '../middleware/seatLockUnlock.js';
import Seat from '../models/seat.model.js';

export const handleSeatLock = async (req, res) => {
    try {
        const { seatIds, userId } = req.body;
        await lockSeats(seatIds, userId);
        
        res.status(200).json({ 
            message: 'Seats locked successfully',
            lockedUntil: new Date(Date.now() + 10 * 60 * 1000)
        });
    } catch (error) {
        res.status(400).json({ 
            error: error.message || 'Failed to lock seats' 
        });
    }
};

export const getSeatStatus = async (req, res) => {
    try {
        const { showtimeId } = req.params;
        
        const seats = await Seat.find({ showtime: showtimeId })
            .select('seatNumber status');
            
        res.status(200).json(seats);
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to get seat status' 
        });
    }
};