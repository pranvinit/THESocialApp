const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`;

  const messsage = `<p>Please verify your email by clicking on the following link: <a href=${verifyEmail}>Verify Email</a>`;
  return sendEmail({
    to: email,
    subject: "Verify Email",
    html: `<h3>Hello ${name}
    <br>
    ${messsage}
    `,
  });
};

module.exports = sendVerificationEmail;
