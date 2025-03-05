const handleUpload = async (file) => {
    if (!file) {
        throw new Error('Nenhum arquivo enviado ou arquivo não é PDF.');
    }

    return file.buffer;
};

module.exports = {
    handleUpload
};
