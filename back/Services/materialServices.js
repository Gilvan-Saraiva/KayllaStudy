// Services/materialServices.js
const Material = require('../models/material');
const User = require('../models/users');

const postarMaterial = async (title, description, youtubeURL, usersId, pdfFiles = []) => {
    try {
        const pdfPath = pdfFiles.map(file => file.path);

        const novoMaterial = new Material({
            title,
            description,
            pdfPath,
            youtubeURL,
            usuariosAssociados: usersId,
        });
         novoMaterial.set('pdfPath', pdfPath);
        await novoMaterial.save();

        await User.updateMany(
            { _id: { $in: usersId } },
            {
                $push: {
                    youtubeURL: { $each: youtubeURL },
                    pdfPath: { $each: pdfPath },
                    materiaisAssociados: novoMaterial._id
                }
            }
        );

        return { response: 201, message: "Material Criado", status: "success" };
    } catch (error) {
        // Retorne o erro para que o controlador possa lidar com ele
        return { response: 400, message: error.message, status: "error" };
    }
};

module.exports = { postarMaterial };
