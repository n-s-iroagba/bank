import nodemailer from 'nodemailer';
import path from 'path';

import { SuperAdmin } from '../models/SuperAdmin';

import { COMPANY_NAME, COMPANY_VERIFICATION_EMAIL } from '../data/emailData';
import { getVerificationEmailContent } from '../helpers/getVerificationEmailContent';


const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: 'gtfcreditunion@gmail.com',
    pass: 'ueed hobh ghbz hzmb',
  },
  logger: true, // Enable logger
  debug: true // Enable debug
})

const logoPath = path.join(__dirname, '../assets/images/logo.png');
console.log('logoPath',logoPath)

export const sendVerificationEmail = async (user: SuperAdmin) => {
  const emailHtmlContent = getVerificationEmailContent(user)
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from:COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: `Verify your email address to complete registration at ${COMPANY_NAME}`,
      attachments: [{
        filename: 'logo.png',
        path: logoPath,
        cid: 'unique@logo' // same CID as in the HTML img src
      }],
      ...emailBody
    

    });
  } catch (error:any) {
    console.error('Error sending verification email:', error);
  }
};

// export const sendCustomMail = async (user:Investor, emailContent:{body:string,subject:string})=>{
//   const content = getCustomEmailContent(user,emailContent);

//   try {
//     const emailBody = { html: content };
//     await transporter.sendMail({
//       from: COMPANY_VERIFICATION_EMAIL,
//       to: user.email,
//       subject: emailContent.subject,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       ...emailBody,

//     });
//   } catch (error:any) {
//     console.error('Error sending verification email:', error);
//   }
// };




// export const sendTransactionMail = async (refreeInvestor: Investor, newInvestor: Investor) => {
//   const emailBody = getReferralThankYouEmailContent(refreeInvestor,newInvestor,COMPANY_NAME);
//   let mailOptions = {
//     from: COMPANY_REFERRAL_EMAIL,
//     to: refreeInvestor.email,
//     subject: 'Referral Registeration',
//      html:emailBody
//   };
//   try{
//     await transporter.sendMail(mailOptions);
//   } catch (error:any) {
//     console.error('Error sending referral completed email:', error);
  
//   }
// };

// export const sendPasswordResetEmail = async (user:Investor|Admin) => {
//   const verificationToken = user.changePasswordToken;
//   const verificationUrl = `${VERIFY_PASSWORD_RESET_TOKEN_URL}/${verificationToken}`;
//   const emailHtmlContent = getNewPasswordEmailContent(verificationUrl, TOKEN_EXPIRATION_TIME, COMPANY_NAME);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_VERIFICATION_EMAIL,
//       to: user.email,
//       subject: `Change your ${COMPANY_NAME} account password`,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       ...emailBody,
//     });
//   } catch (error:any) {
//     console.error('Error sending password reset email:', error.message);
//   }
// };


// export const sendPasswordChangedEmail = async (investor: Investor, investment: Investment) => {
//   const emailHtmlContent = getInvestmentPausedReminderEmailContent(investor, investment);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       subject: `Reminder concerning paused investment`,
//       ...emailBody,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// };

// export const sendLoggedInMail = async (investor:Investor,promo:Promo) => {
//   const emailHtmlContent = getInvestmentPromoEmailContent(investor, promo);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       subject: `Promotion !!!`,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       ...emailBody,
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// };



// export const sendFixedDepositProfitMail = async (investor: Investor, promo:Promo) => {
//   const emailHtmlContent = getInvestmentPromoEmailContent(investor, promo);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       subject: `Promo extension`,
//       ...emailBody,
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// }
// export const sendHowToInvestMail = async (investor: Investor,  depositWallet: DepositWallet,
//   amount: number,
//   adminWallet: AdminWallet) => {
//   const emailHtmlContent = getHowToInvestEmailContent(investor,  depositWallet,amount,adminWallet);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       subject: `How To Make Your Investment Deposit`,
//       ...emailBody,
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// }

// export const sendReferralBonusEmail = async (investor:Investor,referral:Referral) => {
//   const emailHtmlContent = getReferralBonusEmailContent(investor, referral);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       subject: `Payment of referral bonus`,
//       ...emailBody,
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// };

// export const sendPromoBonusEmail = async (investor:Investor,promoAmount:number) => {
//   const emailHtmlContent = getInvestmentPromoBonusEmailContent(investor, promoAmount);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       subject: `Payment of deposit Bonus`,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       ...emailBody,
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// }
// export const sendInvestmentDepositReceivedEmail = async (investor: Investor, investment:Investment) => {
//   const emailHtmlContent = getInvestmentDepositReceivedEmailContent(investor, investment);
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       subject: ` Deposit received`,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       ...emailBody,
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// };

// export const sendInvestmentReminderEmails = async ()=>{
//  try{
//   const investors = await Investor.findAll();

//   for (const investor of investors) {

//     const investment = await Investment.findOne({
//       where: {
//         investorId: investor.id
//       }
//     })
//     if(!investment){
//      return
//     }
//     const hasValidInvestment =  investment.amountDeposited > 0

//     if (!hasValidInvestment) { 
//       await sendReminderMail(investor)
//     }
//   }
// }catch(error){
//   console.error(error)
// }
// }

// const sendReminderMail =async (investor:Investor) => {
//   const emailHtmlContent = `Dear ${investor.firstName}  ${investor.lastName},\n\nIt looks like you have no investments or your investments have a zero balance Our Investors are making profits daily, do not be left out.
//    Please consider making a deposit.\n\nBest regards,\n
//    Investment Team`
//   try {
//     const emailBody = { html: emailHtmlContent };
//     await transporter.sendMail({
//       from: COMPANY_SUPPORT_EMAIL,
//       to: investor.email,
//       subject: `Make your first deposit`,
//       attachments: [{
//         filename: 'blacklogo.png',
//         path: logoPath,
//         cid: 'unique@logo' // same CID as in the HTML img src
//       }],
//       ...emailBody,
//     });
//   } catch (error: any) {
//     console.error('Error sending paused investment email:', error.message);
//   }
// }


