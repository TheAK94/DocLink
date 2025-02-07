import multer from 'multer';
import path from 'path';

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original file name
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
