const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "huynhvantoan.tk07@gmail.com",
      pass: "lsyf kakb zrup ehnm", // Kiểm tra xem có cần sử dụng mật khẩu ứng dụng không
    },
  });

  const mailOptions = {
    from: "matchmake.com",
    to: email,
    subject: "Email verification",
    text: `Please click on the following link to verify your email: http://localhost:3000/api/verify/${verificationToken}`,
  };

  // Gửi email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending the verification email:", error.message);
  }
};

module.exports = { sendVerificationEmail };
