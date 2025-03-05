const pdfService = require('../Services/pdfServices');

exports.uploadPDF = async (req, res) => {
    try {
        const file = req.file; 
        const userId = req.body.userId; 

      
        const ans = await pdfService.handleUpload(file, userId);

        return res.status(ans.response).send(ans.message)
    } catch (error) {
        console.log(error);
    }
};