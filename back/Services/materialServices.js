const Material = require('../models/material');
const User = require('../models/users');
const mongoose = require('mongoose');

const postarMaterial = async (title, description, youtubeURL, usersId, pdfFiles = []) => {
    try {
        const pdfPath = pdfFiles.map(file => file.path);

        const youtubeURLArray = Array.isArray(youtubeURL) ? youtubeURL : [youtubeURL];

        // Converter as URLs completas do YouTube para URLs de incorporação
        const youtubeEmbedUrls = youtubeURLArray.map(url => {
            const videoIdMatch = url.match(/(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/[^\n\s]*|(?:v|e(?:mbed)?)\/)([\w-]{11}))|(?:https?:\/\/(?:www\.)?youtube\.com\/(?:\S+?[\?&]v=|.*\/v\/)([\w-]{11}))/);
            if (videoIdMatch && videoIdMatch[1]) {
                return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
            }
            return url; // Caso não encontre o ID, retorna a URL original (não é ideal, mas pelo menos não quebra o sistema)
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
            youtubeURL: youtubeEmbedUrls, // Salva a URL de incorporação
            usuariosAssociados: validUsersId,
        });

        const material = await novoMaterial.save();

        if (usersId.length > 0) {
            await User.updateMany(
                { _id: { $in: usersId } },
                {
                    $push: {
                        youtubeURL: { $each: youtubeEmbedUrls },
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
