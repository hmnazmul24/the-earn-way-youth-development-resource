import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendEmail = async (otp: number, email: string) => {
  const mailOptions = {
    from: process.env.AUTH_MAIL,
    to: email,
    subject: "Your OTP Code from The Earn Way Youth Development Resourse.",
    text: `Hello,

We received a request to verify your account for your The Earn Way Youth Development Resourse.

Your OTP code is: ${otp}

If you did not request this, please ignore this email or contact support if you have questions.

Thank you,
The Earn Way Youth Development Resourse.
`,
    html: `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
        <p style="text-align: center;">Hello,</p>
        <p style="text-align: center;">We received a request to verify your account for your The Earn Way Youth Development Resourse.</p>
        <p style="text-align: center; font-size: 1.2em; margin: 20px 0;">Your OTP code is:</p>
        <p style="text-align: center; font-size: 2em; font-weight: bold; color: #007bff;">${otp}</p>
        <p style="text-align: center;">If you did not request this, please ignore this email or contact support if you have questions.</p>
        <p style="text-align: center;">Thank you,</p>
        <p style="text-align: center;">The Earn Way Youth Development Resourse.</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
        <p style="font-size: 0.9em; color: #666; text-align: center;">This email was sent to you by The Earn Way Youth Development Resourse.</p>

      </div>
    </body>
    </html>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
