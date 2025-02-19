const { response } = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            console.log("ja existe");
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

module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    getUsersByRole,
    loginUser
};