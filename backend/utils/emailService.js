const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send booking confirmation emails
const sendBookingConfirmation = async (booking) => {
  const transporter = createTransporter();

  // Email to customer
  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Booking Confirmation - Sonu Tent & Decoration Lighthouse',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Sonu Tent & Decoration Lighthouse</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Your Celebration, Our Creation!</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #1E3A8A; margin-bottom: 20px;">Booking Confirmed! 🎉</h2>
          
          <p>Dear ${booking.name},</p>
          
          <p>Thank you for choosing Sonu Tent & Decoration Lighthouse for your special event. We're excited to make your celebration unforgettable!</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Booking Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Package:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${booking.package}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Event Date:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date(booking.eventDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Amount:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">₹${booking.totalPrice.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Status:</strong></td>
                <td style="padding: 8px 0;"><span style="background: #FFD700; color: #1E3A8A; padding: 4px 8px; border-radius: 4px; font-size: 12px;">PENDING</span></td>
              </tr>
            </table>
          </div>
          
          <p><strong>What's Next?</strong></p>
          <ul>
            <li>Our team will contact you within 24 hours to confirm details</li>
            <li>We'll discuss any specific requirements or customizations</li>
            <li>Final confirmation and payment details will be shared</li>
          </ul>
          
          <p>If you have any questions, feel free to contact us:</p>
          <p>📞 +91 98765 43210<br>
          📧 info@sonutent.com</p>
          
          <p>Thank you for trusting us with your special day!</p>
          
          <p>Best regards,<br>
          <strong>Sonu Tent & Decoration Lighthouse Team</strong></p>
        </div>
        
        <div style="background: #1E3A8A; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Sonu Tent & Decoration Lighthouse. All rights reserved.</p>
        </div>
      </div>
    `
  };

  // Email to admin
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Booking Received - Sonu Tent & Decoration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1E3A8A; color: white; padding: 20px;">
          <h1 style="margin: 0;">New Booking Alert! 🎉</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #1E3A8A;">Booking Details:</h2>
          
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <tr style="background: #f0f0f0;">
              <td style="padding: 12px; font-weight: bold;">Customer Name</td>
              <td style="padding: 12px;">${booking.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Email</td>
              <td style="padding: 12px;">${booking.email}</td>
            </tr>
            <tr style="background: #f0f0f0;">
              <td style="padding: 12px; font-weight: bold;">Phone</td>
              <td style="padding: 12px;">${booking.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Package</td>
              <td style="padding: 12px;">${booking.package}</td>
            </tr>
            <tr style="background: #f0f0f0;">
              <td style="padding: 12px; font-weight: bold;">Event Date</td>
              <td style="padding: 12px;">${new Date(booking.eventDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Total Amount</td>
              <td style="padding: 12px; color: #1E3A8A; font-weight: bold;">₹${booking.totalPrice.toLocaleString()}</td>
            </tr>
          </table>
          
          ${booking.message ? `
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #1E3A8A;">Customer Message:</h3>
              <p style="margin-bottom: 0;">${booking.message}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #FFD700; border-radius: 8px;">
            <p style="margin: 0; color: #1E3A8A; font-weight: bold;">
              📋 Action Required: Please contact the customer within 24 hours to confirm the booking details.
            </p>
          </div>
        </div>
      </div>
    `
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(customerMailOptions),
    transporter.sendMail(adminMailOptions)
  ]);
};

// Send contact form notification
const sendContactNotification = async (contact) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Contact Form Submission - Sonu Tent & Decoration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1E3A8A; color: white; padding: 20px;">
          <h1 style="margin: 0;">New Contact Message 📧</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <tr style="background: #f0f0f0;">
              <td style="padding: 12px; font-weight: bold;">Name</td>
              <td style="padding: 12px;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold;">Email</td>
              <td style="padding: 12px;">${contact.email}</td>
            </tr>
            ${contact.phone ? `
            <tr style="background: #f0f0f0;">
              <td style="padding: 12px; font-weight: bold;">Phone</td>
              <td style="padding: 12px;">${contact.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px; font-weight: bold;">Submitted</td>
              <td style="padding: 12px;">${new Date(contact.createdAt).toLocaleString()}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #1E3A8A;">Message:</h3>
            <p style="margin-bottom: 0; line-height: 1.6;">${contact.message}</p>
          </div>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendBookingConfirmation,
  sendContactNotification
};