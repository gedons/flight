// backend/utils/sendEmail.js
const transporter = require('../config/emailConfig');

const sendBookingConfirmation = async (user, booking) => {
  const message = {
    from: '"Flight Booking" <no-reply@flightbooking.com>',
    to: user.email,
    subject: 'Booking Confirmation',
    text: `Dear ${user.username},\n\nYour booking has been confirmed.\n\nFlight Details:\nFlight Number: ${booking.flight.flightNumber}\nDeparture: ${booking.flight.departure}\nDestination: ${booking.flight.destination}\nDeparture Time: ${booking.flight.departureTime}\nArrival Time: ${booking.flight.arrivalTime}\nSeats: ${booking.seats}\nTotal Price: $${booking.totalPrice}\n\nThank you for booking with us!\n\nBest regards,\nFlight Booking Team`,
    html: `
      <div style="font-family: Nunito, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #333;">Booking Confirmation</h2>
        <p>Dear ${user.username},</p>
        <p>Your booking has been confirmed.</p>
        <h3>Flight Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Flight Number:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${booking.flight.flightNumber}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Departure:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${booking.flight.departure}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Destination:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${booking.flight.destination}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Departure Time:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${booking.flight.departureTime}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Arrival Time:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${booking.flight.arrivalTime}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Seats:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${booking.seats}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Total Price:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${booking.totalPrice}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Thank you for booking with us!</p>
        <p>Best regards,<br>Flight Booking Team</p>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

module.exports = { sendBookingConfirmation };
