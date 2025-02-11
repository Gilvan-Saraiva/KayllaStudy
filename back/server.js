const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./Routes/api');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB Atlas', err));
    
app.use('/api', routes);  

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});