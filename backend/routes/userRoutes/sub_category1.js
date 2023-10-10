const express = require('express')
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const userRouter = express.Router();

const {viewSubcategory, getSubcategorylist, viewSubcategorylist, addSubcategory,viewtotalSubCategory, updateSubcategory, delSubcategory} = require('../../controller/sub_category');

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
    


userRouter.post('/addsubcategory', upload.single("subCategory_image"), addSubcategory)
userRouter.get('/viewsubcategory', viewSubcategory)
userRouter.get('/getsubcategorylist', getSubcategorylist)
userRouter.get('/viewtotalsubcategory', viewtotalSubCategory)
userRouter.delete('/delsubcategory/:subCategory_id',delSubcategory)
userRouter.put('/updatesubcategory/:subCategory_id', upload.single("subCategory_image"), updateSubcategory)
userRouter.get('/subcategorylist', viewSubcategorylist)


module.exports = userRouter;