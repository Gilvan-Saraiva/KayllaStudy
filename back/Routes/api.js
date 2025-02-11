const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../Controllers/userController')


// CONFIG DOS PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });


router.get('/', userController.hello);

// Rotas CRUD
router.post('/users', userController.cadastraUsuario); // Criar usuário



module.exports = router;