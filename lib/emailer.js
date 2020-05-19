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

    let info = transporter.sendMail({
        from: `"Chirag Doctor" <${config.get('emailConfig.username')}>`, 
        to: `${email}`,
        subject: "Survey Form",
        html: `<b>Hello, ${name}</b> 
                <p>Thanks for filling out the survey form. Your details have been registered.</p>`, 
      });
}

module.exports = sendEmail;