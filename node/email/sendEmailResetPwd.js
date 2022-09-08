const nodemailer = require('nodemailer');
const config = require("config");

const sendResetEmail = (email, resetPassword) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get("adminMail"),
                pass: config.get("adminMailPwd")
            },
        });

        let mailOptions = {
            from: config.get("adminMail"),
            to: email,
            subject: "Reset password for hodaya's website ",
            html: `
        <h1>Here is a link to reset your password:</h1>
        <div><a href="http://localhost:3000/reset-password/${resetPassword}/${email}">click here!</a></div>
        <h3>Have a nice day :)</h3>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.log("We had some error:", error);
    }
};

module.exports = {
    sendResetEmail,
};