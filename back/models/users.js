const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String
    },
    pdfPath: { // Novo campo para armazenar o caminho do PDF
        type: [String],
        default: [],
    },
    youtubeURL: { // Novo campo para armazenar o caminho do YouTube
        type: [String],
        default: null,
    },
    materiaisAssociados: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Material',
    },
});

module.exports = mongoose.model('User', userSchema);