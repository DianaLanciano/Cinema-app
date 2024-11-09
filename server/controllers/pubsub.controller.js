import Client from '../models/client.model.js';
import sendNotification from '../utils/emailServices/email.service.js';

export const handleNewMovieUpdate = async (message) => {
  try {
    const subscribedClients = []; //await Client.find({ channel: "newMovieUpdate" });
    // Notify each subscribed client
    //subscribedClients.forEach((client) => {
      sendNotification('', message); // Actual notification logic
    //});
  } catch (error) {
    console.error("Error handling new movie notification:", error);
  }
  
};
