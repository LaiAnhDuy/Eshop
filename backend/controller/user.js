const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken")

// create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename
      const filePath = `uploads/${filename}`
      fs.unlink(filePath, (err) => {
        if(err) {
          console.log(err)
          res.status(500).json({message: "Error deleting file"})
        } else {
          res.json({message: "File deleted successfully"})
        }
      })
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user)

    const activationUrl = `http://localhost:3000/activation/${activationToken}`
    
    try {
      await sendEmail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the linh to activate your account" ${activationUrl}`
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500))
    }

  } catch (error) {
    return next(new ErrorHandler(error.message), 400);
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.ACTIVATION_SECRET,{
    expiresIn: "5m"
  })
}



module.exports = router;
