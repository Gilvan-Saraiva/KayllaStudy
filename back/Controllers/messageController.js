const Message = require('../models/message');
const User = require('../models/users');

// Função para enviar mensagem
exports.sendMessage = async (req, res) => {
    const { senderId, content } = req.body;

    try {
        const sender = await User.findById(senderId);
        if (!sender) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const newMessage = new Message({
            sender: senderId,
            content
        });

        await newMessage.save();
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar mensagem.', error });
    }
};

// Função para obter todas as mensagens
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('sender', 'name email').sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter mensagens.', error });
    }
};
