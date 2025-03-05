const materialServices = require('../Services/materialServices');
const { deletarMaterial, listarMateriais } = require('../Services/materialServices');


exports.getMateriais = async (req, res) => {
    try {
        const materiais = await listarMateriais();

        if (!materiais || materiais.length === 0) {
            return res.status(404).json({ message: 'Nenhum material encontrado.' });
        }

        res.status(200).json({ message: 'Materiais encontrados.', payload: materiais });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar materiais.', error: error.message });
    }
};

exports.deleteMaterial = async (req, res) => {
    try {
        const { materialId } = req.params;

        if (!materialId) {
            return res.status(400).json({ message: 'O ID do material é obrigatório.' });
        }

        const result = await deletarMaterial(materialId);
        return res.status(result.response).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar material.', error: error.message });
    }
};

exports.postMaterial = async (req, res) => {
    try {
        let { title, description, youtubeURL, usersId } = req.body;

        // Verifica se usersId foi fornecido
        if (!usersId) {
            return res.status(400).json({ message: 'O campo usersId é obrigatório.' });
        }

        // Converte usersId para array, se necessário
        if (typeof usersId === 'string') {
            usersId = usersId.split(',').map(id => id.trim()); // Converte string separada por vírgulas em array
        } else if (!Array.isArray(usersId)) {
            return res.status(400).json({ message: 'Formato inválido para usersId. Deve ser uma string ou um array.' });
        }

        // Verifica se usersId é um array válido
        if (usersId.length === 0) {
            return res.status(400).json({ message: 'O campo usersId não pode estar vazio.' });
        }

        const pdfFiles = req.files || []; // Garante que pdfFiles seja um array, mesmo que vazio
        console.log('pdfs', pdfFiles);
        const ans = await materialServices.postarMaterial(
            title,
            description,
            youtubeURL,
            usersId,
            pdfFiles
        );

        res.status(ans.response).json(ans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};