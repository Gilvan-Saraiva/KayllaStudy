const materialServices = require('../Services/materialServices');

exports.postMaterial = async (req, res) => {
    try {
        const {title, description, youtubeURL, usersId} = req.body;
        const pdfFiles = req.files;
        const ans = await materialServices.postarMaterial(
            title, 
            description,
            youtubeURL,
            usersId,
            pdfFiles);
        res.status(ans.response).json(ans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}