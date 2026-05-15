import express, { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import Gig from "../models/gig.js";
import mongoose from "mongoose";

const router = express.Router();

// --- [1] جلب البيانات (كما فعلنا سابقاً) ---

router.get("/gigs", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gigs = await Gig.find().populate("user", "username email");
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
});

router.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// --- [2] روابط الحذف (Admin Delete Routes) ---

// 1. حذف مستخدم
// DELETE http://localhost:3000/api/admin/user/:id
router.delete("/user/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // التأكد من أن الـ ID صالح لـ MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ message: "Invalid User ID format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // (اختياري) حذف جميع خدمات هذا المستخدم عند حذفه
    await Gig.deleteMany({ user: id });

    res.status(200).json({ message: "User and their gigs have been deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// 2. حذف خدمة
// DELETE http://localhost:3000/api/admin/gig/:id
router.delete("/gig/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ message: "Invalid Gig ID format" });
    }

    const deletedGig = await Gig.findByIdAndDelete(id);

    if (!deletedGig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.status(200).json({ message: "Gig has been deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;