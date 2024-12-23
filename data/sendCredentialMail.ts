import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendWelcomeMail = async (email: string, password: string) => {
  const mailOptions = {
    from: `"The Earn Way Youth Development Resource" <${process.env.AUTH_MAIL}>`,
    to: email,
    subject: "Welcome to The Earn Way - Your Branch Ownership is Approved!",
    text: `Dear ${email},

Congratulations and welcome to The Earn Way Youth Development Resource family!

We are excited to inform you that your application for branch ownership has been successfully approved after a thorough verification process. You are now officially a branch owner with all the associated privileges.

As a part of your branch setup, a secure password has been generated for your account. Please find your branch access details below:

Branch Password: ${password}

You can log in to your personalized branch owner portal using the credentials provided. We recommend updating your password immediately after your first login to ensure maximum security.

If you have any questions or need assistance, feel free to reach out to our support team.

Thank you for joining us in our mission to empower youth through development and growth.

Best regards,
The Earn Way Youth Development Resource Team

P.S. For your security, we recommend keeping your login details safe and secure. If you did not request this branch ownership, please contact us immediately.
`,
    html: `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; text-align: center;">Welcome to The Earn Way</h2>
        <p>Dear ${email},</p>
        <p>Congratulations and welcome to The Earn Way Youth Development Resource family!</p>
        <p>We are excited to inform you that your application for branch ownership has been successfully approved after a thorough verification process. You are now officially a branch owner with all the associated privileges.</p>
        <p>As a part of your branch setup, a secure password has been generated for your account. Please find your branch access details below:</p>
        <p style="font-size: 1.1em; font-weight: bold;">Branch Password: ${password}</p>
        <p>You can log in to your personalized branch owner portal using the credentials provided. We recommend updating your password immediately after your first login to ensure maximum security.</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Thank you for joining us in our mission to empower youth through development and growth.</p>
        <p>Best regards,</p>
        <p>The Earn Way Youth Development Resource Team</p>
        <p style="font-size: 0.9em; color: #666;">P.S. For your security, we recommend keeping your login details safe and secure. If you did not request this branch ownership, please contact us immediately.</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
        <p style="font-size: 0.9em; color: #666; text-align: center;">This email was sent by The Earn Way Youth Development Resource. If you received this in error, please ignore it.</p>
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
    return { success: false };
  }
};

export default sendWelcomeMail;
