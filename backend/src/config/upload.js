const multer = require('multer')
const path = require('path')

module.exports = {
    storage: multer.diskStorage({
        // path. resolve colcoa a barra correta de acordo com SO
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext)
            callback(null, `${name}-${Date.now()}${ext}`)
        }
    })
}