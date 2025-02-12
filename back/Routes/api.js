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




// Rotas CRUD USERS
router.post('/users', userController.cadastraUsuario);
router.get('/users', userController.getUsers); 
router.put('/users/:email', userController.updateUsers);
router.delete('/users/:email', userController.deleteUsers);


module.exports = router;