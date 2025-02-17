const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../Controllers/userController');
const pdfController = require('../Controllers/pdfController');
const materialController = require('../Controllers/materialController');


// Configuração do Multer para upload de PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nome do arquivo
    }
});

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



// Rotas CRUD USERS
router.post('/users', userController.cadastraUsuario);
router.get('/users', userController.getUsers); 
router.put('/users/:email', userController.updateUsers);
router.delete('/users/:email', userController.deleteUsers);
router.get('/users/role/:role', userController.getUsersByRole);

// Rotas PDF
router.post('/upload-pdf', upload.single('pdf'), pdfController.uploadPDF);

// Rotas Materiais
router.post('/materiais', upload.array('pdfFiles'), materialController.postMaterial);

module.exports = router;