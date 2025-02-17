const materialServices = require('../Services/materialServices');

exports.postMaterial = async (req, res) => {
    try {
        let { title, description, youtubeURL, usersId } = req.body;
        
        // Se usersId for uma string, converte para array
        if (typeof usersId === 'string') {
            try {
                usersId = JSON.parse(usersId);
            } catch (err) {
                return res.status(400).json({ message: 'Formato inválido para usuários associados.' });
            }
        }
        
        const pdfFiles = req.files;
        const ans = await materialServices.postarMaterial(
            title, 
            description,
            youtubeURL,
            usersId,
            pdfFiles
        );
        res.status(ans.response).json(ans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
