import Subscriber from '../models/subscriber.model.js';
import sendNotification from '../utils/emailServices/email.service.js';

export const handleNewMovieUpdate = async (newMovie) => {
  try {
    // 
    const subscribedClients = await Subscriber.find({ channel: { $in: ["newMovieUpdate"] } });
    // Notify each subscribed client
    subscribedClients.forEach((subscriber) => {
      sendNotification(subscriber.email, newMovie); // Actual notification logic
    });
  } catch (error) {
    console.error("Error handling new movie notification:", error);
  }
  
};
