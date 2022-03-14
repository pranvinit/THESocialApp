const sendEmail = require("./sendEmail");
const sendPasswordResetEmail = async ({ name, email, token, origin }) => {
  const resetPassword = `${origin}/auth/reset-password?passwordToken=${token}&email=${email}`;

  const messsage = `<p>Please reset your password clicking on the following link: <a href=${resetPassword}>Reset Password</a>`;
  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h3>Hello ${name}
    <br>
    ${messsage}
    `,
  });
};

module.exports = sendPasswordResetEmail;
