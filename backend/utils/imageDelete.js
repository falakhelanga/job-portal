import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const imageDeleter = (image_url) => {
  const exactlyPath = path.join(__dirname, image_url);
  try {
    fs.unlink(exactlyPath, (err) => {
      if (err) {
        const error = new Error(err);
        error.code = 500;
        throw error;
      }
    });
  } catch (error) {
    next(error);
  }
};

export default imageDeleter;
