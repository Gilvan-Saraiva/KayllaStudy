const User = require('../models/users');

// Função para lidar com o upload de PDF
const handleFileUpload = async (file, userId) => {
    if (!file) {
        throw new Error('Nenhum arquivo enviado ou arquivo não é PDF.');
    }

    const filePath = file.path;

    // Se um userId for fornecido, associe o PDF ao usuário
    if (userId) {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { pdfPath: filePath },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('Usuário não encontrado.');
        }

        return {
            message: 'Arquivo PDF enviado e associado ao usuário com sucesso!',
            filePath: filePath,
            user: updatedUser
        };
    }

    // Caso não haja userId, apenas retorne as informações do arquivo
    return {
        message: 'Arquivo PDF enviado com sucesso!',
        filePath: filePath
    };
};

module.exports = {
    handleFileUpload,
};