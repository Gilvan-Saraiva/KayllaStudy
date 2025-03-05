const User = require('../models/users');

// Função para lidar com o upload de PDF
const handleFileUpload = async (file, userId) => {
    if (!file) {
        throw new Error('Nenhum arquivo enviado ou arquivo não é PDF.');
    }
}
const handleUpload = async (file, userId) => {
    try {
        if (!file) {
            throw new Error('Nenhum arquivo enviado ou arquivo não é PDF.');
        }

        const pdfBuffer = file.buffer; 

        if (userId) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { pdfPath: pdfBuffer } },
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('Usuário não encontrado.');
            }

            return {
                message: 'Arquivo PDF enviado e associado ao usuário com sucesso!',
                user: updatedUser,
                response: 200
            };
        }

        return {
            message: 'Arquivo PDF enviado com sucesso!',
            response: 200
        };
    } catch (error) {
        console.error('Erro ao enviar PDF:', error);
        return {
            message: 'Erro interno ao processar o arquivo.',
            response: 500
        };
    }
};

// Exportando a função
module.exports = {
    handleUpload
};