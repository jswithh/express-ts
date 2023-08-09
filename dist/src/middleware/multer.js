import multer from 'multer';
import fs from 'fs';
import path from 'path';
const upload = (folderName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let uploadPath = '';
            const allowedMimeTypes = ['image/jpeg', 'image/png'];
            if (allowedMimeTypes.includes(file.mimetype)) {
                uploadPath = `public/images/${folderName}/`;
            }
            else {
                uploadPath = `public/documents/${folderName}/`;
            }
            console.log(file);
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });
    const fileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(null, false);
        }
        cb(null, true);
    };
    return multer({
        storage,
        limits: { fileSize: 10000000 },
        fileFilter,
    });
};
export default upload;
//# sourceMappingURL=multer.js.map