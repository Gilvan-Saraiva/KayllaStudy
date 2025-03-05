const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pdfPath: {
        type: [Buffer],
        default: [],
    },    
    youtubeURL: {
        type: [String],
        default: [],
    },
    usuariosAssociados: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Material', materialSchema);