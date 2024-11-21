import { SuperAdmin } from "../models/SuperAdmin";

export const getVerificationEmailContent = (user: SuperAdmin): string => {
    return `<!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        color: #333;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .header img {
        width: 150px;
        margin-bottom: 10px;
      }
      .content {
        text-align: center;
      }
      .verification-code {
        font-size: 1.5em;
        font-weight: bold;
        color: #007bff;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 0.9em;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img  src="cid:unique@logo"  alt="Company Logo" />
        <h1>Welcome to Our Platform</h1>
      </div>
      <div class="content">
        <p>Dear ${user.firstname} ${user.surname},</p>
        <p>Thank you for signing up. Please use the following verification code to complete your registration:</p>
        <p class="verification-code">${user.verificationCode}</p>
        <p>If you did not initiate this registration, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
     
    `;
  };
  