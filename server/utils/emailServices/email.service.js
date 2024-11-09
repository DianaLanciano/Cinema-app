import nodemailer from 'nodemailer';

const sendNotification = async (email, newMovie) => {
    const email1 = "isakovdiana1@gmail.com";
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <funcinema10@gmail.com>', // sender address
        to: email1, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: ", mailOptions.messageId);

   
};

export default sendNotification;






