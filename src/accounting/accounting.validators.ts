import * as multer from "multer";
import * as path from "path";
// export const fileUploadOptions = () => ({
//   fileFilter(req: any, file: any, callback: any) {
//     const ext = path.extname(file.originalname);
//     const allowed = [".json"];
//     if (allowed.includes(ext)) {
//       callback(null, true);
//     } else {
//       callback(null, false); // handle error in middleware, not here
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
// });

export const fileUploadOptions = multer({
  //   storage: multer.memoryStorage(),
  fileFilter(req, files, callback) {
    const ext = path.extname(files.originalname);
    const allowed = [".json"];
    if (allowed.includes(ext)) {
      callback(null, true);
    } else {
      callback(null, false); // handle error in middleware, not here
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
