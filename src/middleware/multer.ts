import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import fs from 'fs';
import path from 'path';

interface CustomRequest extends Request {
  fileValidationError?: string;
}

const upload = (folderName: string) => {
  const storage = multer.diskStorage({
    destination: (req: CustomRequest, file, cb) => {
      let uploadPath = '';

      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (allowedMimeTypes.includes(file.mimetype)) {
        uploadPath = `public/images/${folderName}/`;
      } else {
        uploadPath = `public/documents/${folderName}/`;
      }

      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req: CustomRequest, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (
    req: CustomRequest,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (
      !file.originalname.match(
        /\.(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/,
      )
    ) {
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
