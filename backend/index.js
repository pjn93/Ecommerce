const express = require('express');
const myapp = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
let swaggerjsdoc = require('swagger-jsdoc');
let swaggerui = require('swagger-ui-express');
const cron = require('node-cron')
const fs = require('fs');


let option = {
     definition:{
         openapi: "3.0.0",
         info :{
             title: "node js api documentation for mysql",
             version: "1.0.0"
         },
         servers: [
             {
             url: 'http://localhost:7000'
             }
         ]
     },
     apis:['./controller/users.js', './controller/offer.js', './controller/user_profile.js', './controller/role.js', './controller/role_assign.js', './controller/category.js', './controller/sub_category.js', './controller/retailer_registration.js' ]
 }
  myapp.use('/testing', swaggerui.serve, swaggerui.setup(swaggerjsdoc(option)))


myapp.use(express.json());
myapp.use(cors())
myapp.use(cookieParser());


const cart = require('./routes/userRoutes/cart1');
myapp.use('/api',cart)

const cartidgenerate = require('./routes/userRoutes/cartid_generate1')
myapp.use('/api',cartidgenerate)

const category = require('./routes/userRoutes/category1')
myapp.use('/api',category)

const customer = require('./routes/userRoutes/customer1')
myapp.use('/api',customer)

const discount = require('./routes/userRoutes/discount1')
myapp.use('/api',discount)

const offer = require('./routes/userRoutes/offer1')
myapp.use('/api',offer)

const place_order = require('./routes/userRoutes/place_order1')
myapp.use('/api',place_order)

const product = require('./routes/userRoutes/product1')
myapp.use('/api',product)

const productdescription = require('./routes/userRoutes/product_description1')
myapp.use('/api',productdescription)

const retailerbanking = require('./routes/userRoutes/retailer_banking1')
myapp.use('/api',retailerbanking)

const retailerregistration = require('./routes/userRoutes/retailer_registration1')
myapp.use('/api',retailerregistration)

const role = require('./routes/userRoutes/role1')
myapp.use('/api',role)

const roleassign = require('./routes/userRoutes/role_assign1')
myapp.use('/api',roleassign)

const subcategory = require('./routes/userRoutes/sub_category1')
myapp.use('/api',subcategory)

const userprofile = require('./routes/userRoutes/user_profile1')
myapp.use('/api',userprofile)

const users = require('./routes/userRoutes/users1')
myapp.use('/api',users)

cron.schedule("* 1 * * *", function(){
    let data = `Hi cron job running\n`
    fs.appendFile('logs.txt', data, function(err){
        if(err) throw err;
        console.log('file data added')
    })
})

                                                                                                                  
const port = 7000;
myapp.listen(port,()=>{
     console.log(`Server running on port ${port}`)
});
