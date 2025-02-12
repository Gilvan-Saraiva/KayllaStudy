const pdfServices = require('../Services/pdfServices');

exports.uploadPDF = async (req, res) => {
    try {
        const file = req.file; // Arquivo enviado
        const userId = req.body.userId; // ID do usuário (opcional)

        // Chama o service para lidar com o upload
        const ans = await pdfServices.handleFileUpload(file, userId);

        res.status(ans.response).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};