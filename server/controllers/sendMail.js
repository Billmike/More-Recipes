import handleBars from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';

/**
 * Creates the nodemailer transport for sending emails
 * and defines a template to be used
 */

const sendMail = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.PASSWORD,
  },
});

sendMail.use('compile', handleBars({
  viewPath: 'server/email-templates',
  extName: '.hbs'
}));

export default sendMail;
