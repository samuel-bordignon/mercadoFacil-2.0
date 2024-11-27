const fs = require('fs')
const path = require('path')

// Função para converter Base64 em arquivo e salvá-lo
const saveBase64ToFile = (base64Data) => {
    // Caminho absoluto para a pasta do front-end
    const uploadPath = path.resolve(__dirname, '../../../front/src/assets/uploads_images')
    
    // Certifique-se de que a pasta existe
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true })
    }

    // Extrai informações do Base64
    const match = base64Data.match(/^data:(.+)base64,(.+)$/)
    if (!match) {
        throw new Error('Formato Base64 inválido')
    }

    const mimeType = match[1]
    const base64String = match[2]
    const extension = mimeType.split('/')[1] // Obtém a extensão do arquivo, ex: png, jpg
    const extensionTratada = extension.replace(/;$/, '') // Tratamento para extensão 

    // Cria um nome único para o arquivo
    const fileName = `${Date.now()}.${extensionTratada}`
    const filePath = path.join(uploadPath, fileName)

    // Converte o Base64 para Buffer e salva no disco
    const buffer = Buffer.from(base64String, 'base64')
    fs.writeFileSync(filePath, buffer)

    console.log(`Arquivo salvo em: ${filePath}`)
    return filePath // Retorna o caminho do arquivo
}

module.exports = saveBase64ToFile
