const userServices = require('../Services/userServices');


exports.cadastraUsuario = async (req, res) => {
    const data = req.body;
    console.log(data)
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