const User = require('../models/users');

// Criar um usuário
const createUser = async (userData) => {
    const newUser = new User(userData);
    console.log(newUser);
    await newUser.save();
    return newUser;
};

// Obter todos os usuários
const getUsers = async () => {
    return await User.find();
};

// Obter um usuário por ID
const getUserById = async (userId) => {
    return await User.findById(userId);
};

// Atualizar um usuário
const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Deletar um usuário
const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};