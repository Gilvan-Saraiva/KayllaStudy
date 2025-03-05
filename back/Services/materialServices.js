const Material = require('../models/material');
const User = require('../models/users');
const mongoose = require('mongoose');

const postarMaterial = async (title, description, youtubeURL, usersId, pdfFiles = []) => {
    try {
        const pdfBuffers = pdfFiles.map(file => file.buffer);

        const youtubeURLArray = Array.isArray(youtubeURL) ? youtubeURL : [youtubeURL];

        const youtubeVideoIds = youtubeURLArray.map(url => {
            const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/))([\w-]{11})/);
            return videoIdMatch ? videoIdMatch[1] : url;
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
            pdfPath: pdfBuffers,
            youtubeURL: youtubeVideoIds,
            usuariosAssociados: validUsersId,
        });

        const material = await novoMaterial.save();

        if (usersId.length > 0) {
            await User.updateMany(
                { _id: { $in: usersId } },
                { $push: { materiaisAssociados: novoMaterial._id } }
            );            
        }

        return { response: 201, message: "Material Criado", status: "success" };
    } catch (error) {
        return { response: 400, message: error.message, status: "error" };
    }
};

const deletarMaterial = async (materialId) => {
    try {
        // Verifica se o material existe
        const material = await Material.findById(materialId);
        if (!material) {
            return { response: 404, message: 'Material não encontrado.', status: 'error' };
        }

        // Remove o material
        await Material.findByIdAndDelete(materialId);

        // Remove a referência do material em todos os usuários
        await User.updateMany(
            { materiaisAssociados: materialId },
            { $pull: { materiaisAssociados: materialId } }
        );

        return { response: 200, message: 'Material deletado com sucesso.', status: 'success' };
    } catch (error) {
        return { response: 500, message: error.message, status: 'error' };
    }
};

const listarMateriais = async () => {
    return await Material.find({});
};

module.exports = { deletarMaterial, postarMaterial, listarMateriais };