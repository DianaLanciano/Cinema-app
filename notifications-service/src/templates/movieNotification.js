// templates/movieNotifications.js
// This file defines how the email will look
export const createMovieNotification = (movie) => ({
    subject: `New Movie: ${movie.title}`,
    html: `
        <div style="font-family: Arial;">
            <h1>New Movie Added!</h1>
            <h2>${movie.title}</h2>
            <img src="${movie.posterUrl}" style="max-width: 300px"/>
            <p>${movie.synopsis}</p>
            <p>Starring: ${movie.actors.join(', ')}</p>
            <a href="http://localhost:5173/movie/${movie._id}" 
               style="background-color: #e11d48; color: white; 
                      padding: 10px 20px; text-decoration: none;">
                Book Now
            </a>
        </div>
    `
});