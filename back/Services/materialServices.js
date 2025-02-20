// Services/materialServices.js
const Material = require('../models/material');
const User = require('../models/users');
const mongoose = require('mongoose');
const postarMaterial = async (title, description, youtubeURL, usersId, pdfFiles = []) => {
    try {
        // Garanta que pdfPath seja um array de caminhos de arquivos
        const pdfPath = pdfFiles.map(file => file.path);

        // Garanta que youtubeURL seja um array
        const youtubeURLArray = Array.isArray(youtubeURL) ? youtubeURL : [youtubeURL];

        // Crie o novo material
        const validUsersId = usersId.map(id => {
            id = id.replace(/^"+|"+$/g, '');
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new Error(`O id "${id}" não é um ObjectId válido.`);
            }
            return new mongoose.Types.ObjectId(id);
          });
          

        const novoMaterial = new Material({
            title,
            description,
            pdfPath,
            youtubeURL: youtubeURLArray,
            usuariosAssociados: validUsersId,
        });

        // Salve o material no banco de dados
        const material = await novoMaterial.save();
        console.log(material);

        // Verifique se usersId não está vazio
        if (usersId.length > 0) {
            // Atualize os usuários associados
            await User.updateMany(
                { _id: { $in: usersId } },
                {
                    $push: {
                        youtubeURL: { $each: youtubeURLArray },
                        pdfPath: { $each: pdfPath },
                        materiaisAssociados: novoMaterial._id
                    }
                }
            );
        } else {
            console.warn("Nenhum ID de usuário fornecido. O material não foi associado a nenhum usuário.");
        }

        return { response: 201, message: "Material Criado", status: "success" };
    } catch (error) {
        // Retorne o erro para que o controlador possa lidar com ele
        return { response: 400, message: error.message, status: "error" };
    }
};

module.exports = { postarMaterial };