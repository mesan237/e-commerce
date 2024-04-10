import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "frontend/dist/uploads/";
    } else {
      path = "frontend/public/uploads/";
    }
    cb(null, path);
  },

  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    image:
      process.env.NODE_ENV === "production"
        ? `/${req.file.path.slice(14)}`
        : `/${req.file.path.slice(16)}`,
  });
});

export default router;
