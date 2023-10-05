import multer from "multer";
import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { deleteImage, uploadImage } from "../controllers/image.controller.js";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "src/uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, `${req.user.id}.${file.originalname}`);
  },
});

const fileFilter = (_req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const router = Router();

router
  .post("/upload", authMiddleware, upload.single("image"), uploadImage)
  .delete("/delete", authMiddleware, deleteImage);

export default router;
