// middleware/seatLock.middleware.js
const LOCK_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

seatSchema.index({ status: 1, lockedAt: 1 }) //  The index creates a separate sorted list like this:
//it will iterate 
// status    | lockedAt           | document_id
// -----------------------------------------
// available | null               | id1
// available | null               | id2
// locked    | 2024-12-07T09:00  | id3   // MongoDB jumps directly here!
// locked    | 2024-12-07T10:00  | id4
// pending   | ***********       | id5  // MongoDB stops here!



const unlockExpiredSeats = async () => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    try {
        // MongoDB will use our index here
        // First finds seats with status 'locked'
        // Then checks only those seats' lockedAt times
        await Seat.updateMany(
            {
                status: 'locked',
                lockedAt: { $lt: tenMinutesAgo }
            },
            {
                $set: {
                    status: 'available',
                    lockedAt: null,
                    lockedBy: null
                }
            }
        );
    } catch (error) {
        console.error('Error unlocking seats:', error);
    }
};

// function to lock seats
const lockSeats = async (seatIds, userId) => {
    try {
        const currentTime = new Date();
        
        // Use updateMany to lock multiple seats at once
        const result = await Seat.updateMany(
            {
                _id: { $in: seatIds },
                status: 'available'  // Only lock if available
            },
            {
                $set: {
                    status: 'locked',
                    lockedAt: currentTime,
                    lockedBy: userId
                }
            }
        );

        // Check if all seats were locked
        if (result.modifiedCount !== seatIds.length) {
            throw new Error('Some seats are not available');
        }

        return true;
    } catch (error) {
        console.error('Error locking seats:', error);
        throw error;
    }
};

// Function to start the cleanup interval
const startSeatCleanup = () => {
    // Run cleanup every minute
    setInterval(unlockExpiredSeats, 60 * 1000);
    console.log('Seat cleanup scheduler started');
};

export { lockSeats, unlockExpiredSeats, startSeatCleanup };