import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./eventimages";


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
        cb(null, `${Date.now()}-${sanitizedFilename}`);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Only images (JPEG, PNG) and PDFs are allowed!"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});


export const uploadBrochure = (req, res, next) => {
    upload.single("EventBrochure")(req, res, (err) => {
        if (err) {
            console.error("Multer Error:", err.message);
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }
        
        next();
    });
};
