const { response } = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { transporter } = require("../helpers/emailHelper.js");
const crypto = require('crypto');



// Função auxiliar para hash de senha
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Login de usuário
const loginUser = async (userData) => {
    try {
        const user = await getUserByEmail(userData.email);
        if (!user) {
            return { response: 404, message: "Usuário não encontrado" };
        }

        const validPassword = await bcrypt.compare(userData.password, user.password);
        if (!validPassword) {
            return { response: 401, message: "Senha inválida" };
        }

        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            response: 200,
            message: "Login realizado com sucesso",
            payload: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        };
    } catch (error) {
        return { response: 500, message: "Erro ao realizar login" };
    }
};

// Criar um usuário (modificado para incluir hash de senha)
const createUser = async (userData) => {
    try {
        const existeUsuario = await getUserByEmail(userData.email);
        if (existeUsuario) {
            return { response: 400, message: "Usuario ja cadastrado" };
        }

        // Hash da senha antes de salvar
        userData.password = await hashPassword(userData.password);
        
        const newUser = new User(userData);
        await newUser.save();
        return { response: 201, message: "Usuario Criado", status: "success" };
    } catch (error) {
        throw new Error(error);
    }
};

// Atualizar um usuário (modificado para tratar senha)
const updateUser = async (email, updateData) => {
    try {
        const existeUsuario = await getUserByEmail(email);
        if (!existeUsuario) {
            return { response: 404, message: "Usuario não encontrado" };
        }

        // Se estiver atualizando a senha, fazer o hash
        if (updateData.password) {
            updateData.password = await hashPassword(updateData.password);
        }

        await User.findOneAndUpdate({email: email}, updateData, { new: true });
        return { response: 200, message: "Usuario Atualizado" };
    } catch (error) {
        throw new Error(error);
    }
};

// Manter as outras funções existentes
const getUsers = async () => {
    try {
        const users = await User.find().select('-password'); // Excluir senha dos resultados
        return { response: 200, payload: users };
    } catch (error) {
        return { response: 404, message: "usuarios não encontrados"};
    }
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const deleteUser = async (email) => {
    try { 
        const existeUsuario = await getUserByEmail(email);
        if (!existeUsuario) {
            return { response: 404, message: "Usuario não encontrado" };
        }
        await User.findOneAndDelete({email: email});
        return { response: 200, message: "Usuario Deletado" };
    } catch (error) {
        throw new Error(error);
    }
};

const getUsersByRole = async (role) => {
    try {
        const users = await User.find({ role }).select('-password');
        if (users.length === 0) {
            return { response: 404, message: "Nenhum usuário encontrado com essa role" };
        }
        return { response: 200, payload: users };
    } catch (error) {
        return { response: 500, message: "Erro ao buscar usuários" };
    }
};

const recuperaSenha = async (email) => {
    try {
        const existeUsuario = await getUserByEmail(email);
        
        if (existeUsuario.rowCount === 0) {
            return { response: 404, message: "Usuário não encontrado" };
        }

        const resetToken = generateResetToken(6);

        // Atualiza o usuário com o token de recuperação
        await updateUser(email, { resetToken }); // Corrigido

        const mailOptions = {
            from: 'studyred78@gmail.com',
            to: email,
            subject: 'Recuperação de Senha',
            text: `O seu código de redefinição de senha é: ${resetToken}`,
        };

        // Usando `await` para aguardar o envio do e-mail corretamente
        try {
            await transporter.sendMail(mailOptions);
            return { response: 200, message: "E-mail de recuperação enviado com sucesso" };
        } catch (error) {
            return { response: 500, message: "Erro ao enviar o e-mail de recuperação de senha" };
        }

    } catch (error) {
        return { response: 500, message: "Erro interno no servidor" };
    }
};

const trocaSenha = async (data) => {
    const { email, tokenReset, novaSenha } = data;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return { response: 404, message: "Usuário não encontrado" };
        }
        if (user.resetToken !== tokenReset) {
            return { response: 400, message: "Token inválido" };
        }
        const hashedPassword = await hashPassword(novaSenha);

        await User.findOneAndUpdate(
            { email: email },
            { 
                password: hashedPassword,
                resetToken: null // Remove o token de redefinição após a troca de senha
            },
            { new: true }
        );
        
        return { response: 200, message: "senha alterada" };
    } catch (error) {
        throw new Error(error);
    }
};

const generateResetToken = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
};


module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    getUsersByRole,
    loginUser,
    recuperaSenha,
    trocaSenha
};