import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'studyred78@gmail.com',
        pass: 'lsoj fcdr alrs vlot',
    },
});

module.exports = {
    transporter
};