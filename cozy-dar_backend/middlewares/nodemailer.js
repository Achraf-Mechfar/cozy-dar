const nodemailer = require('nodemailer');
const dayjs = require('dayjs');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

module.exports = transporter;

const sendMail_Initial_Approved=(to,meet_date,full_name)=>{
const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: to,
    subject: 'Property Initial Approved',
    html: `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f8f9fa;
        padding: 20px;
        color: #333;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin: auto;
      }
      .header {
        font-size: 24px;
        font-weight: bold;
        color: #007BFF;
        margin-bottom: 15px;
        text-align: center;
      }
      .info {
        margin-top: 15px;
        font-size: 16px;
        line-height: 1.6;
      }
      .meeting {
        background-color: #e7f3ff;
        padding: 15px;
        border-left: 4px solid #007BFF;
        margin: 20px 0;
        border-radius: 4px;
        font-weight: bold;
      }
      .footer {
        font-size: 14px;
        margin-top: 30px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
    <div style="padding:13px 0 ; background-color: #007BFF; color: #ffffff; border-radius: 4px; font-size:28px; margin-bottom:20px; text-align:center">CozyDar</div>
    
      <div class="header">Your Property Listing Is One Step Closer!</div>
      <div class="info">
        Hello, <br><br>
        Thank you for submitting your property to our platform. We’re excited to move forward with your listing!
        <br><br>
        Your request has been <strong>initially approved</strong>, and we’ve scheduled a visit to your property to complete the final steps:
        <ul>
          <li>Take professional photos</li>
          <li>Capture a 360° virtual tour</li>
          <li>Verify property details</li>
        </ul>

        <div class="meeting">
          📅 <strong>Meeting Date:</strong> <br>
          <span style="font-size: 18px;">${dayjs(meet_date).format('dddd, MMM DD')}</span> <br>
          📍 At your property location
        </div>

        Please make sure the property is accessible and prepared for the visit.
        <br><br>
        If you have any questions or need to reschedule, feel free to reply to this email.
        <br><br>
        Looking forward to meeting you!
      </div>

      <div class="footer">
        – CozyDar Team<br>
        contact@cozydar.com
      </div>
    </div>
  </body>
</html>

    `,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
}
module.exports={sendMail_Initial_Approved}   