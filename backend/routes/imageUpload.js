import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const checkFileTypes = (file, cb) => {
  const fileTypes = /png|jpg|jpeg/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    return cb("something went wrong");
  }
};

const uploading = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

router.post("/", uploading.single("image"), (req, res, next) => {
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});

export default router;
