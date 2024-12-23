import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_PASS,
  },
});

export const sendAdmissionEmail = async (
  studentName: string,
  email: string
) => {
  const mailOptions = {
    from: process.env.AUTH_MAIL,
    to: email,
    subject: `Congratulations ${studentName}! Welcome to The Earn Way Youth Development Resource`,
    text: `Dear ${studentName},

Congratulations!

We are pleased to inform you that you have been admitted to The Earn Way Youth Development Resource. This marks the beginning of an exciting journey toward knowledge, growth, and success.

At The Earn Way, we are committed to equipping you with the skills, education, and opportunities that will empower your future.

Please ensure to complete all required formalities for your enrollment, and stay tuned for updates regarding your orientation.

We are thrilled to have you as part of our institution.

Welcome aboard!

Warm regards,  
The Earn Way Youth Development Resource Team
`,
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #007bff; text-align: center;">Congratulations, ${studentName}!</h1>
          <p style="text-align: center; font-size: 1.1em; color: #333;">
            We are thrilled to announce that you have been admitted to  
            <strong>The Earn Way Youth Development Resource</strong>.
          </p>
          
          <p style="text-align: center; margin: 20px 0; font-size: 1em; color: #555;">
            This marks the beginning of an exciting journey towards knowledge, growth, and success.  
          </p>

          <div style="background: #007bff; color: white; text-align: center; padding: 10px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin: 0;">Welcome to the Earn Way Family!</h2>
          </div>

          <p style="color: #333; font-size: 1em; text-align: center;">
            To finalize your admission, please ensure to complete all required formalities.  
            We will send additional information about the orientation schedule soon.
          </p>

        

          <p style="text-align: center; font-size: 1.1em; margin-top: 30px; font-weight: bold; color: #333;">
            We are excited to see you thrive!
          </p>

          <p style="text-align: center; font-size: 0.9em; color: #666;">
            Best Regards,<br/>
            <strong>The Earn Way Youth Development Resource Team</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="font-size: 0.8em; color: #777; text-align: center;">
            This email was sent by The Earn Way Youth Development Resource.  
            Please do not reply to this email.  
          </p>
        </div>
      </body>
    </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending admission email:", error);
    return { success: false, error };
  }
};

export const sendPaymentNotificationEmail = async (
  studentName: string,
  email: string,
  trade: string,
  amount: number
) => {
  const mailOptions = {
    from: process.env.AUTH_MAIL,
    to: email,
    subject: `Payment Confirmation for ${studentName} - ${trade} Program`,
    text: `Dear ${studentName},

We are pleased to confirm that your payment of $${amount} has been received for the ${trade} program.

This confirms your continued enrollment in the ${trade} course at The Earn Way Youth Development Resource.

If you have any further questions regarding your payment or program, feel free to reach out to our support team.

Thank you, and we wish you success in your studies.

Warm regards,  
The Earn Way Youth Development Resource Team
`,
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; line-height: 1.6; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #007bff; text-align: center; margin-top: 0;">Payment Confirmation</h2>
          <p style="font-size: 1.1em; color: #333; text-align: center;">Dear <strong>${studentName}</strong>,</p>
          
          <p style="text-align: center; font-size: 1em; color: #555;">
            We are pleased to confirm that your payment of  
            <strong style="color: #28a745;">${amount} taka </strong>  
            has been successfully received for the  
            <strong style="color: #007bff;">${trade}</strong>  
            program.
          </p>

          <div style="background: #28a745; color: white; text-align: center; padding: 10px; border-radius: 5px; margin: 20px auto;">
            <h3 style="margin: 0;">Enrollment Confirmed</h3>
          </div>

          <p style="color: #333; text-align: center;">
            This confirms your continued enrollment in the  
            <strong>${trade}</strong> program at The Earn Way Youth Development Resource.
          </p>

       

          <p style="text-align: center; margin-top: 30px; font-size: 1.1em; color: #333;">
            Thank you, and we wish you success in your studies!
          </p>

          <p style="text-align: center; color: #555; font-size: 0.9em;">
            Warm regards,<br />
            <strong>The Earn Way Youth Development Resource Team</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 0.8em; color: #777; text-align: center;">
            This email was sent by The Earn Way Youth Development Resource.  
            Please do not reply to this email.
          </p>
        </div>
      </body>
    </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Payment notification email sent successfully:",
      info.messageId
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending payment notification email:", error);
    return { success: false, error };
  }
};
