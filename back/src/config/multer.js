const multer = require('multer')
const path = require('path')

// Definir o destino do upload para a nova pasta
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Caminho absoluto para a pasta de uploads no front-end
        const uploadPath = path.join(__dirname, '../../front/src/assets/uploads_images')
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

// Criação do middleware de upload
const upload = multer({ storage })

module.exports = upload
