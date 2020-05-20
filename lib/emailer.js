const nodemailer = require('nodemailer');
const config = require('config');

function sendEmail(name, email) {
    let transporter = nodemailer.createTransport({
        host: config.get('emailConfig.host'),
        port: config.get('emailConfig.port'),
        secure: true,
        auth: {
            user: config.get('emailConfig.username'),
            pass: config.get('emailConfig.password'),
        },
    });
    const mailOptions = {
        from: `"Chirag Doctor" <${config.get('emailConfig.username')}>`,
        to: `${email}`,
        subject: "Survey Form",
        html: `<b>Hello, ${name}</b> 
                <p>Thanks for filling out the survey form. Your details have been registered.</p>`,
    }
    return transporter.sendMail(mailOptions);
}

function sendEmailUsingGmail(name, email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.get('gmailConfig.username'),
            pass: config.get('gmailConfig.password'),
        }
    });
    const mailOptions = {
        from: `"Chirag Doctor" <${config.get('gmailConfig.username')}>`,
        to: `${email}`,
        subject: "Survey Form",
        html: `Hello, <b>${name}</b> 
                <p>Thanks for filling out the survey form. Your details have been registered.</p>`,
    }
    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendEmail,
    sendEmailUsingGmail
};