import express from "express";
import courseController from "../controller/courseController.js";
import upload from "../util/cloudinary.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("🚀 courseRouter loaded");

router.post(
  "/create",
  upload.single("image"),
  (req, res) => {
    console.log("TEST req.body:", req.body);
    console.log("TEST req.file:", req.file);
    res.json({ ok: true });
  },
  authMiddleware.verifyToken,
  authMiddleware.adminOnly,
  courseController.createCourse,
);
router.get(
  "/findAll",
  authMiddleware.verifyToken,
  courseController.findAllCourses,
);
router.get(
  "/findById/:id",
  authMiddleware.verifyToken,
  courseController.findById,
);
router.put(
  "/update/:id",
  upload.single("image"),
  authMiddleware.verifyToken,
  authMiddleware.adminOnly,
  courseController.update,
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  authMiddleware.adminOnly,
  courseController.deleteData,
);

export default router;
