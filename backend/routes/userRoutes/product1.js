const express = require('express')
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const userRouter = express.Router();

const {viewProduct, addProduct, modifyProduct, updateProduct, postProduct, viewshopProducts, delProduct, viewavailableProducts, viewtotalProduct} = require('../../controller/product');

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


userRouter.post('/addproduct', upload.single("image"), addProduct)
userRouter.post('/postproduct', upload.single("image"), postProduct)
userRouter.get('/viewshopproduct', viewshopProducts)
userRouter.get('/viewproduct', viewProduct)
userRouter.put('/modifyproduct/:product_id', upload.single("image"), modifyProduct)
userRouter.get('/viewtotalproduct', viewtotalProduct)
userRouter.delete('/delproduct/:product_id',delProduct)
userRouter.put('/updateproduct', updateProduct)
userRouter.post('/viewavailableproducts/:retailer_id', viewavailableProducts)

// userRouter.patch('/updateproductquantity', updateproductquantity)

module.exports = userRouter;