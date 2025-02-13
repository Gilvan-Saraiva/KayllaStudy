const { response } = require('express');
const User = require('../models/users');

// Criar um usuário
const createUser = async (userData) => {
    const newUser = new User(userData);
    try {
        const existeUsuario = await getUserByEmail(userData.email);
        if (existeUsuario) { 
            console.log("ja existe");
            return { response: 400, message: "Usuario ja cadastrado" }
        };
        await newUser.save();
        return { response: 201, message: "Usuario Criado", status: "success" };
    } catch (error) {
        throw new Error(error);
    }
    
};

// Obter todos os usuários
const getUsers = async () => {
    try {
        const users =  await User.find();
        return { response: 200, payload: users };
    } catch (error) {
        return { response: 404, message: "usuarios não encontrados"}
    }
    
};

// Obter um usuário por ID
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Atualizar um usuário
const updateUser = async (email, updateData) => {
    try {
        const existeUsuario = getUserByEmail(email)
        if (!existeUsuario) {
            return { response: 404, message: "Usuario não encontrado" }
        }
        await User.findOneAndUpdate({email: email}, updateData, { new: true });
        return { response: 200, message: "Usuario Atualizado" };
    } catch (error) {
        throw new Error(error);
    }

};

// Deletar um usuário
const deleteUser = async (email) => {
    try { 
        const existeUsuario = getUserByEmail(email)
        if (!existeUsuario) {
            return { response: 404, message: "Usuario não encontrado" }
        }
        await User.findOneAndDelete(email);
        return { response: 200, message: "Usuario Deletado" };
    } catch (error) {
        throw new Error(error);
    }
}
    
    const getUsersByRole = async (role) => {
        try {
            const users = await User.find({ role });
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
        getUsersByRole
    };