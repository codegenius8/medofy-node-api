const nodemailer = require("nodemailer");

function createResult(error, message, data, count) {
    const result = {};
    if (error == null || error == undefined) {
        (result["status"] = 200),
            (result["message"] = message),
            (result["data"] = data),
            (result["count"] = count);
    } else {
        result["status"] = 400;
        if (error.message) {
            result["message"] = error.message;
        } else {
            result["message"] = error;
        }
    }
    return result;
}

function createError(message) {
    return createResult(message, message);
}

function createSuccess(message, data) {
    return createResult(null, message, data);
}

function randomNumber(length = 4) {
    const chars = "0123456789";
    let randomstring = "";
    for (let i = 0; i < length; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

const sendEmail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            // port: 587,
            // secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: subject,
            text: text,
            html: html,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = {
    createResult: createResult,
    createError: createError,
    createSuccess: createSuccess,
    randomNumber: randomNumber,
    sendEmail: sendEmail,
};
