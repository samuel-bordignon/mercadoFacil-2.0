const express = require('express')
const saveBase64ToFile = require('../config/saveBase64ToFile')
const router = express.Router()

// Rota para upload e retorno do caminho do arquivo
router.post('/upload', async (req, res) => {
    const { image } = req.body

    // Validação básica
    if (!image) {
        return res.status(400).json({ error: 'Imagem em Base64 não fornecida' })
    }

    try {
        // Salva a imagem no servidor e retorna o caminho
        const filePath = saveBase64ToFile(image)

        // Retorna apenas o caminho do arquivo salvo
        res.json({ filePath })
    } catch (error) {
        console.error('Erro ao salvar a imagem:', error)
        res.status(500).json({ error: 'Erro ao salvar a imagem' })
    }
})

module.exports = router
