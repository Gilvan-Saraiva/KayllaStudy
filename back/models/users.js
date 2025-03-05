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
    youtubeURL: { 
        type: [String],
        default: [],
    },
    materiaisAssociados: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Material',
    },
    resetToken: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);