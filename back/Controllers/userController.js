const userServices = require('../Services/userServices');

exports.loginUser = async (req, res) => {
    const data = req.body;
    try {
        const ans = await userServices.loginUser(data);
        return res.status(ans.response).json(ans.payload || { message: ans.message });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.cadastraUsuario = async (req, res) => {
    const data = req.body;
    try {
        const ans = await userServices.createUser(data);
        return res.status(ans.response).json({ message: ans.message });

    } catch (error) {
        throw new Error(error);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const ans = await userServices.getUsers();
        return res.status(ans.response).send({ payload: ans.payload });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateUsers = async (req, res) => {
    const email = req.params.email;
    const updateData = req.body;
    try {
        const ans = await userServices.updateUser(email, updateData);
        return res.status(ans.response).send(ans.message);
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteUsers = async (req, res) => {
    const email = req.params.email;
    try {
        const ans = await userServices.deleteUser(email);
        return res.status(ans.response).send(ans.message);
    } catch (error) {
        throw new Error(error);
    }
};
exports.getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const ans = await userServices.getUsersByRole(role);
        return res.status(ans.response).json(ans.payload || { message: ans.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.recuperaSenha = async (req, res) => {
    try {
        if (!req.body || !req.body.email) {
            return res.status(400).send("O campo 'email' é obrigatório.");
        }

        const email = req.body.email;
        const ans = await userServices.recuperaSenha(email);
        return res.status(ans.response).send(ans.message);
    } catch (error) {
        return res.status(500).send("Erro interno do servidor.");
    }
};
exports.trocaSenha = async (req, res) => {
    const data = req.body;

    try {
        const ans = await userServices.trocaSenha(data);
        return res.status(ans.response).send(ans.message);
    } catch (error) {
        throw new Error(error);
    }
};
exports.updateUserToAluno = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userServices.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        user.role = "aluno";
        await user.save();

        return res.status(200).json({ message: "Usuário atualizado para aluno" });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};