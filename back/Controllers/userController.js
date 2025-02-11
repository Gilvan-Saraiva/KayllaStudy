const userServices = require('../Services/userServices');

exports.hello = async (req, res) => {
    console.log('hello world!');
    res.send('hello world!');
}

exports.cadastraUsuario = async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const ans = await userServices.createUser(data);
        return res.status(ans.response).send(ans.message);

    } catch (error) {
        throw new Error(error);
    }
}

