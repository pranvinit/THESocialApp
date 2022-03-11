const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  // test condtion
  const testAccount = await nodemailer.createTestAccount();

  // ethereal config
  const transporter = nodemailer.createTransport(nodemailerConfig);

  await transporter.sendMail({
    from: '"THESocialApp" <THESocialApp@tsa.com>', // sender address
    to, // list of receivers
    subject,
    html,
  });
};

module.exports = sendEmail;
