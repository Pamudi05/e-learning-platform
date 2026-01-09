import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 }from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueFileName = `${uuidv4()}${ext}`;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage });

export default upload;
