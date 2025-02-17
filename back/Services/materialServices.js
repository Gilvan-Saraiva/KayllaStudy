const Material = require('../models/material');
const User = require('../models/users');
const fs = require('fs');
const path = require('path');

const postarMaterial = async (title, description, pdfFiles, usersId) => {

    try {
        const pdfPath = pdfFiles.map(file => file.path);
        
        const novoMaterial = new Material({
            title,
            description,
            pdfPath,
            youtubeURL,
            usuariosAssociados: usersId,
        });
        await novoMaterial.save();
        await User.updateMany({ _id: { $in: usersId } }, {
            $push: { youtubeURL: { $each: youtubeURL } }, pdfPath: { $each: pdfPath }, materiaisAssociados: novoMaterial._id
        }
        );
        return { response: 201, message: "Material Criado", status: "success" };
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { postarMaterial };