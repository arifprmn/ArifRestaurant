const nodemailer = require("nodemailer");
const USER = process.env.USER;
const PASS = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: USER,
    pass: PASS,
  },
});
console.log(USER, PASS);
const sendConfirmationEmail = (username, email, verificationCode) => {
  transport
    .sendMail({
      from: USER,
      to: email,
      subject: "Verify your account if you want to use this account",
      html: `
    <div>
        <h1>Email Verification</h1>
        <h2>Hi ${username},</h2>
        <p>Please verify your email address by clicking on the following link</p>
        <a href="http://localhost:3000/verif/${verificationCode}"> Click here</a>
        <p>If you did not do any of this, please ignore this email.</p>
    </div>
    `,
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = sendConfirmationEmail;
