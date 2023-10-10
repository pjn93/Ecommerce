const express = require('express')
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const userRouter = express.Router();

const {viewCategory, viewcategoryList, addCategory, updateCategory, delCategory, viewtotalCategory} = require('../../controller/category');

const awsConfig = {
    accessKeyId: "AKIA2TRYZJXMZXJTOUXR",
    secretAccessKey: "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",
    region: "ap-south-1",
    bucketName: "bucketofcategory",
    };
    let S3 = new AWS.S3(awsConfig);
    let upload = multer({
    storage: multerS3({
    bucket: "bucketofcategory",
    s3: S3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
    },
    acl: "public-read",
    key: (req, file, cb) =>
    cb(
    null,
    `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    ),
    }),
    });
    

userRouter.post('/addcategory', upload.single("category_image"), addCategory)
userRouter.get('/viewtotalcategory', viewtotalCategory)
userRouter.get('/viewcategory', viewCategory)
userRouter.delete('/delcategory/:category_id',delCategory)
userRouter.put('/updatecategory/:category_id',  upload.single("category_image"), updateCategory)
userRouter.get('/categorylist', viewcategoryList)



module.exports = userRouter;