import nodemailer from 'nodemailer';

const sendNotification = async (email, newMovie) => {

  // Parse newMovie back to an object
  const movieData = JSON.parse(newMovie);
  const actorList = movieData.actors.map(actor => `- ${actor}`).join('\n');
  const image="https://images.moviesanywhere.com/d6c0f192f5ddc9ca2f7ab4f1d566c6d1/71dc56d0-0fe7-4297-a4c6-1f67a801e26d.jpg?r=3x1&w=2400";
  
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });  
      
      const mailOptions = await transporter.sendMail({
        from: '"New Movie Update 👻" <funcinema10@gmail.com>', // sender address
        to: email, // receivers
        subject: `New Movie Released: ${movieData.title}`, // Subject line
        html: `
        <h2>New Movie Released!</h2>
        <h3>Actors:\n${actorList}</h3>
        <img src="${image}" alt="${movieData.title} Poster" style="width:800px; height:auto; margin-top:15px;" />
        <p>Enjoy the show!</p>
        `, // html body
      });

      console.log("Message sent: ", mailOptions.messageId);

   
};

export default sendNotification;






