import { publisher } from "../pubsub/index.js";

export const newMovieUpdate = async (req, res) => {
  console.log("POST /actionGenre received:", req.body);
  const { movieName, rating } = req.body;

  if (!movieName || !rating) {
    return res.status(400).send("Missing movieName or rating in request body");
  }

  const message = JSON.stringify({ movieName, rating });
  console.log("Message parsed:", message);
  //connect Publisher 
  await publisher.connect();
  publisher.on('connect', () => console.log("Publisher connected"));
  // Publish message to 'actionsMovies' channel
  try {
    await publisher.publish("newMovieUpdate", 'new Movie update from here');
    res.status(200).send(`New action movies update sent`);
  } catch (err) {
    console.error("Error publishing message:", err);
    return res.status(500).send("Error publishing message");
  }
};
