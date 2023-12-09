const express = require("express");
const ProfileDao = require("../dao/profileDao");
const authenticateToken = require("../middleware/authenticateToken");
const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");
const router = express.Router();

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await ProfileDao.getUserProfile(userId);

    if (profile) {
      res.status(200).json({
        message: "Successful",
        profile,
      });
    } else {
      res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    throw error;
  }
});

router.put(
  "/:user_id",
  authenticateToken,
  upload.fields([
    { name: "profile_photo", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = req.body;
      const files = req.files;
      console.log(files);
      const id = req.params.user_id;
      console.log("id", id);

      // upload to cloudinary
      const cover_photo = await cloudinary.uploader.upload(
        files.cover_photo[0].path
      );
      const profile_photo = await cloudinary.uploader.upload(
        files.profile_photo[0].path
      );
      console.log(cover_photo);
      console.log(profile_photo);

      const newData = {
        name: data.name,
        email: data.email,
        contact: parseInt(data.contact),
        bio: data.bio,
      };

      const newProfile = await ProfileDao.updateProfile(
        id,
        newData,
        cover_photo.secure_url,
        profile_photo.secure_url
      );

      if (newProfile) {
        return res.status(201).json({
          message: "Updated successfully",
          newProfile,
        });
      }
      res.status(400).json({
        message: "Update failed",
      });
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
