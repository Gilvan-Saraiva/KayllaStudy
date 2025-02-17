const pdfService = require('../Services/pdfServices');

exports.uploadPDF = async (req, res) => {
    try {
        const file = req.file; // Arquivo enviado
        const userId = req.body.userId; // ID do usuário (opcional)

        // Chama o service para lidar com o upload
        const ans = await pdfService.handleUpload(file, userId);

        return res.status(ans.response).send(ans.message)
    } catch (error) {
        console.log(error);
    }
};