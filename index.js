const ejs = require("ejs");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const path = require("path");
dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// first argument - what is name of email
// second argument - receiver email id
// subject - subject of email
//-------------mail body--------------
//fileName - ejs file name
// receiver Name
// firstName
// lastName
// city

const sendEmail = (name, to, subject, mailData) => {
  const filePath = path.join(__dirname, `/template/${mailData.fileName}.ejs`);
    ejs.renderFile(filePath, {
        firstName: mailData.firstName,
        lastName: mailData.lastName,
        receiver: mailData.receiver,
        city:mailData.city
  }, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      mailOptions = {
        from: {
          name,
          address: process.env.EMAIL_FROM,
        },
        to,
        subject,
        html: data,
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log(`Message sent: ${info.messageId} email`);
        }
      });
    }
  });

};
sendEmail("demo", "manan@yopmail.com", "check email", {
  fileName: "demo",
  receiver: "Manan Patel",
  firstName: "Manan",
  lastName: "Patel",
  city: "Ahmedabad",
});
