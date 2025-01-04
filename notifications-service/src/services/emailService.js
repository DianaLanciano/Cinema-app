// services/emailService.js
// This file handles the actual sending of emails
import { transporter } from "../config/email.config.js";
import { createMovieNotification } from "../templates/movieNotification.js";

export const sendMovieNotification = async (subscribers, movie) => {
  const { subject, html } = createMovieNotification(movie);

  const emailPromises = subscribers.map((subscriber) => {

      if (!subscriber || typeof subscriber !== 'string' || !subscriber.trim()) {
        console.error("Subscriber has no email address:", subscriber);
        return; // Skip this subscriber
      }
      return transporter.sendMail({
        from: '"Cinema Fun 🎬" <no-reply@cinemafun.com>',
        to: subscriber,
        subject,
        html,
      });
    }
  );

  try {
    await Promise.all(emailPromises);
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
