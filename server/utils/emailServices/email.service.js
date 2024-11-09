import nodemailer from 'nodemailer';

const sendNotification = async (email, newMovie) => {

  // Parse newMovie back to an object
  const movieData = JSON.parse(newMovie);

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
        text: `A new movie has been released!\n\n${newMovie.title}`, // Plain text body, // plain text body
        //, // HTML body with movie details in a structured format
      });

      console.log("Message sent: ", mailOptions.messageId);

   
};

export default sendNotification;






