const express = require('express')
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const userRouter = express.Router();

const {viewRetailer, retailerStatusUpdate, addRetailer, viewOwner, updateretailerStatus ,viewtotalShop ,viewtotalStatus ,updateRetailer, updateretailerPicture , viewRetailerlist, updateretailerPassword ,delRetailer, viewShops, getShop,  getOpenShop} = require('../../controller/retailer_registration');

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
    let multiUploads = upload.fields([{name:'registration_document', maxCount: 1}, {name:'profile_photo', maxCount:1}])


  


userRouter.post('/addretailer', multiUploads, addRetailer)
userRouter.post('/viewshops/:retailer_id', viewShops)
userRouter.get('/viewretailer', viewRetailer)
userRouter.get('/viewowner', viewOwner)
userRouter.get('/viewretailerlist', viewRetailerlist)
userRouter.get('/getopenshop', getOpenShop)
userRouter.post('/getshop', getShop)
userRouter.get('/viewtotalshops', viewtotalShop)
userRouter.get('/viewtotalstatus', viewtotalStatus)
userRouter.delete('/delretailer/:retailer_id',delRetailer)
userRouter.put('/updateretailerstatus', retailerStatusUpdate)
userRouter.put('/updateretailer/:retailer_id', multiUploads, updateRetailer)
userRouter.patch('/updateprofilepicture', updateretailerPicture)
userRouter.patch('/updateshopstatus', updateretailerStatus)
userRouter.patch('/updateretailerpassword', updateretailerPassword ) 

module.exports = userRouter;