const Material = require('../models/material');
const User = require('../models/users');
const mongoose = require('mongoose');

const postarMaterial = async (title, description, youtubeURL, usersId, pdfFiles = []) => {
    try {
        const pdfPath = pdfFiles.map(file => file.path);

        const youtubeURLArray = Array.isArray(youtubeURL) ? youtubeURL : [youtubeURL];

        // Extrair apenas os IDs dos vídeos do YouTube
        const youtubeVideoIds = youtubeURLArray.map(url => {
            const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/))([\w-]{11})/);
            if (videoIdMatch && videoIdMatch[1]) {
                return videoIdMatch[1];
            }
            return url;
        });

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
            youtubeURL: youtubeVideoIds, // Salva apenas os IDs dos vídeos
            usuariosAssociados: validUsersId,
        });

        const material = await novoMaterial.save();

        if (usersId.length > 0) {
            await User.updateMany(
                { _id: { $in: usersId } },
                {
                    $push: {
                        youtubeURL: { $each: youtubeVideoIds },
                        pdfPath: { $each: pdfPath },
                        materiaisAssociados: novoMaterial._id
                    }
                }
            );
        }

        return { response: 201, message: "Material Criado", status: "success" };
    } catch (error) {
        return { response: 400, message: error.message, status: "error" };
    }
};

module.exports = { postarMaterial };