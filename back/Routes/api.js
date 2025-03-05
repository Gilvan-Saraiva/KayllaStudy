const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../Controllers/userController');
const pdfController = require('../Controllers/pdfController');
const materialController = require('../Controllers/materialController');
const messageController = require('../Controllers/messageController');
const Material = require('../models/material');

// Configuração do Multer para upload de PDF
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') { // Aceita apenas PDF
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos PDF são permitidos!'), false);
        }
    }
});

router.post('/login', userController.loginUser);
router.put('/users/to-aluno', userController.updateUserToAluno);
// Rotas CRUD USERS
router.post('/users', userController.cadastraUsuario);
router.get('/users', userController.getUsers); 
router.put('/users/:email', userController.updateUsers);
router.delete('/users/:email', userController.deleteUsers);
router.get('/users/role/:role', userController.getUsersByRole);
router.post('/recupera-senha', userController.recuperaSenha);
router.put('/troca-senha', userController.trocaSenha);

// Rota para enviar uma mensagem
router.post('/chat/send', messageController.sendMessage);
router.get('/chat/messages', messageController.getMessages);

router.post('/upload-pdf', upload.single('pdf'), pdfController.uploadPDF);

// Rotas Materiais
router.get('/getmateriais', materialController.getMateriais);
router.post('/materiais', upload.array('pdfFiles'), materialController.postMaterial);
router.delete('/materiais/:materialId', materialController.deleteMaterial);

router.get('/usuario/:userId', async (req, res) => {
    console.log('ID do usuário:', req.params.userId); 
    try {
        const materiais = await Material.find({ usuariosAssociados: req.params.userId });
        
        res.json(materiais);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar materiais.' });
    }
});



module.exports = router;