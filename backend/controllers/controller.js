const data = require('../data/data.json');
const nodemailer = require('nodemailer');

const getCandidateData = (req, res) => {
  try {
    res.json(data);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Function to send email with a dynamic table
const sendCandidateData = async (req, res) => {
  // Replace with your desired recipient email address
  const toEmail = 'giriakhash@gmail.com';

  // Dynamically generate the table rows based on candidates data
  const tableRows = data.map(candidate => `
    <tr>
      <td>${candidate.name}</td>
      <td>${candidate.email_id}</td>
      ${candidate.rounds.map(round => `
      <td>${round.percentage}</td>
      `).join('')
      }
      <td>${candidate.currentStatus}</td>
    </tr>
  `).join('');

  // HTML content for the email body
  const htmlContent = `
    <table border="1" cellpadding="10" style="border-collapse: collapse;">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Aptitude round</th>
        <th>Technical round</th>
        <th>Coding round</th>
        <th>HR round</th>
        <th>Current Status</th>
      </tr>
      ${tableRows}
    </table>
  `;

  // Email options
  const mailOptions = {
    from: `Interview Tracker <${process.env.USER}>`, // Replace with your email address
    to: toEmail,
    subject: 'Interviewed Candidates Report',
    html: htmlContent,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json("Mail sent!");
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  getCandidateData,
  sendCandidateData
};