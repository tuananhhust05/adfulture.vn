
const multer = require('multer')
const express=require('express');
const router= express.Router();

const {
  UpoadImgProduct,
} = require('../../../controllers/admin/file');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
  })
const upload = multer({ storage: storage });
router.post("/upload/product",upload.any("files"),UpoadImgProduct);

module.exports=router;