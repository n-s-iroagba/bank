export const getNewPasswordEmailContent = (
    verificationUrl: string,
    tokenExpirationTime: string,
    companyName: string
  ): string => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            padding-bottom: 20px;
          }
          .email-header img {
            max-width: 150px;
          }
          .email-body {
            padding: 20px;
          }
          .email-body p {
            margin-bottom: 15px;
          }
          .email-body a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .email-footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <img src="cid:unique@logo" alt="${companyName} Logo">
          </div>
          <div class="email-body">
            <h2>Password Reset Request</h2>
            <p>Hello,</p>
            <p>You recently requested to reset your password for your ${companyName} account.</p>
            <p>Please click the link below to reset your password. This link will expire in ${tokenExpirationTime}.</p>
            <a href="${verificationUrl}" target="_blank">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>Thank you,<br>The ${companyName} Team</p>
          </div>
          <div class="email-footer">
            <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  