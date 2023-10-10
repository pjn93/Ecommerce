const connection = require("../modal/Dbconnect")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const viewRetailer = async function(req, res){
    let sqlquery = "SELECT * FROM retailer_registration";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewRetailerlist = async function(req, res){
    let sqlquery = "SELECT retailer_id, owner_name FROM retailer_registration";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    }) 
}

const viewShops = async function(req, res){
    let id = [req.params.retailer_id];
    let sqlquery = "SELECT * FROM retailer_registration where retailer_id=?";
    await connection.query(sqlquery,[id],function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const getOpenShop = async (req, res) => {
    try {
        let { retailer_id, password } = req.body;
        console.log({ retailer_id, password });
        let sqlQuery = "SELECT retailer_id, status, owner_name, password from retailer_registration where retailer_id= ? ";
        let a = await connection.query(sqlQuery, retailer_id, async function (error, result) {
            console.log("object ", a.sql);
            console.log("object ", result);


            const secretKey = 'your-secret-key';
            const options = {
                expiresIn: '1m', // Token expiration time
            };
            const token = jwt.sign({retailer_id}, secretKey, options);
            console.log("token ",token);
            const userVer = await jwt.verify(token, secretKey)
            console.log(userVer)
            if (error) {
                return res.json({ status: 400, response: error.message })
            }
            if (result.length == 0) {
                return res.json({ status: 400, response: "user not found " })
            }
            if (result[0].password == password) {
                if (result[0].status === "Active") {
                    
                    return res.json({ status: 200, response: "user logged in", 
                    token, user: result[0] })
                } else {
                    return res.json({ status: 400, response: "your account is blocked please contact admin" })
                }
            } else {
                res.json({ status: 400, response: "invalid credential" })
            }

            // const passwordCompare = await bcryt.compare(password, result[0].password)
            // console.log({ passwordCompare });

            // if (passwordCompare) {
            //     return res.json({ status: 200, response: "user logged in" })
            // } else {
            //     return res.json({ status: 400, response: "password is wrong" })

            // }

        })
    } catch (error) {
        res.json({ status: 400, response: error.message })
    }
}


const getShop = async (req, res) => {
    try {
        let { retailer_id, password } = req.body;
        console.log({ retailer_id, password });
        let sqlQuery = "SELECT retailer_id, status, owner_name, password from retailer_registration where retailer_id= ? ";
        let a = await connection.query(sqlQuery, retailer_id, async function (error, result) {
            console.log("object ", a.sql);
            console.log("object ", result);
            const secretKey = 'your-secret-key';
            const options = {
                expiresIn: '1m', // Token expiration time
            }; 
            if (error) {
                return res.json({ status: 400, response: error.message })
            }
            if (result.length == 0) {
                return res.json({ status: 400, response: "user not found " })
            }
             else comparePassword = await bcrypt.compare(password, result[0].password)
            if (comparePassword) {
                const token = jwt.sign({retailer_id: result[0].retailer_id}, secretKey, options);
                console.log("token ",token);
                if (result[0].status === "Active") {
                    res.cookie("token", token, {httpOnly : true})
                    return res.json({ status: 200, response: "user logged in", token, user: result[0] })
                } else {
                    return res.json({ status: 400, response: "your account is blocked please contact admin" })
                }
            } else {
                res.json({ status: 400, response: "invalid credential" })
            }

            // const passwordCompare = await bcryt.compare(password, result[0].password)
            // console.log({ passwordCompare });

            // if (passwordCompare) {
            //     return res.json({ status: 200, response: "user logged in" })
            // } else {
            //     return res.json({ status: 400, response: "password is wrong" })

            // }

        })
    } catch (error) {
        res.json({ status: 400, response: error.message })
    }
}



const viewOwner = async function(req, res){
    let id = req.query.retailer_id
    let sqlquery = "select owner_name from retailer_registration where retailer_id = ?";
   await connection.query(sqlquery, id, async function(error, result){
       if(error)
       console.log(error.sqlMessage);
       else
        return res.json(result);  
        console.log(result);
   })
}


const viewtotalStatus = async function(req, res){
     let sqlquery = "select status, count(*) total_shop from retailer_registration group by status";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}


const viewtotalShop  = async function(req, res){
    let sqlquery = "SELECT count(*) as totalShops from retailer_registration";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}


const addRetailer = async (req, res) => {
    try {
            const salt = await bcrypt.genSalt(8);
        const value = await bcrypt.hash(req.body.password, salt)
     console.log("password" ,value)
        const sqlQuery ="INSERT INTO retailer_registration SET?";
    
    const data = {
   retailer_id: req.body.retailer_id,
    shop_name: req.body.shop_name,
    password: value,
    owner_name: req.body.owner_name,
    registration_no: req.body.registration_no,
    registration_document: req.files.registration_document[0].location,
    profile_photo: req.files.profile_photo[0].location,
    gst_no: req.body.gst_no,
    pan_no: req.body.pan_no,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    pincode: req.body.pincode,
    contact_no: req.body.contact_no,
    email: req.body.email,
   
    };
    
    await connection.query(sqlQuery, data, (error, result) => {
    console.log(result, "result");
    console.log(data)
    if (error) {
    res.send({ status: 400, Error: error.sqlMessage });
    } else {
    res.send({ status: 200, response: result });
    }
    });
    } catch (error) {
    res.send({ Error: error.sqlMessage });
    }
    };


const retailerStatusUpdate = async function(req, res){
    let data = req.query.status;
    let id = req.query.retailer_id;
    console.log(data, id)
    let sqlquery = "UPDATE retailer_registration SET status=? where retailer_id = ?";
  await connection.query(sqlquery,[data,id], function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        }
    })
}

const updateRetailer = async (req, res) => {
    try {
         const salt = await bcrypt.genSalt(8);
        const value = await bcrypt.hash(req.body.password, salt);
        console.log("password", value);
      const dataInfo = {         
    shop_name: req.body.shop_name,
    password: value,
    owner_name: req.body.owner_name,
    registration_no: req.body.registration_no,
    registration_document: req.files.registration_document[0].location,
    profile_photo: req.files.profile_photo[0].location,
    gst_no: req.body.gst_no,
    pan_no: req.body.pan_no,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    pincode: req.body.pincode,
    contact_no: req.body.contact_no,
    email: req.body.email,
    registration: req.body.registration,
    status: req.body.status
      }

      const retailer_id = req.params.retailer_id;
      const sqlQuery = "UPDATE retailer_registration SET? where retailer_id = ?";
      await connection.query(
        sqlQuery,
        [dataInfo, retailer_id],
        (error, result) => {
          if (error) {
            res.send({ status: 400, Error: error.sqlMessage });
          } else {
            res.send({ status: 200, response: result });
          }
        }
      );
    } catch (error) {
      res.send({ Error: error.sqlMessage });
    }
  };


const updateretailerPicture = async function(req, res){
    let data = req.body.profile_photo;
    let id = req.query.retailer_id;
    let sqlquery = "UPDATE retailer_registration SET profile_photo=? where retailer_id = ?";
  await connection.query(sqlquery, [data, id], function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        }
    })
}

const updateretailerStatus = async function(req, res){
    let data = req.body.status;
    let id = req.query.retailer_id;
    let sqlquery = "UPDATE retailer_registration SET status=? where retailer_id = ?";
  await connection.query(sqlquery,[data,id], function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        }
    })
}


const updateretailerPassword = async function(req, res){
    const salt = await bcrypt.genSalt(8);
    const value = await bcrypt.hash(req.body.password, salt);
    console.log("password", value);
    let data = value;
    let id = req.query.retailer_id;
    let sqlquery = "UPDATE retailer_registration SET password=? where retailer_id = ?";
  await connection.query(sqlquery,[data,id], function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        }
    })
}


const delRetailer = async function(req, res){
    let id = [req.params.retailer_id];
     let sqlquery = "DELETE FROM retailer_registration WHERE retailer_id = ?";
     await connection.query(sqlquery,[id], function(error, result){
        console.log("result", result)
        if(error){
        console.log(error.sqlMessage);
        }
        else{
         res.send(result);  
         console.log("hello")
        } 
    })
}



module.exports={viewRetailer, retailerStatusUpdate, addRetailer, viewOwner, updateRetailer, updateretailerPicture, updateretailerStatus, delRetailer, viewRetailerlist, updateretailerPassword , viewShops,  viewtotalShop, viewtotalStatus, getOpenShop, getShop  }