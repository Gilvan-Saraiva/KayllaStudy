const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'studyred78@gmail.com',
        pass: 'egargmhregiligbl',
    },
}
);

const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        return { response: 200, message: "E-mail de recuperação enviado com sucesso" };
    } catch (error) {
        return { response: 500, message: "Erro ao enviar o e-mail de recuperação de senha" };
    }
};

module.exports = { transporter, sendEmail };