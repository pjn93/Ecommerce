const connection = require("../modal/Dbconnect")

const viewSubcategory = async function(req, res){
    let sqlquery = "SELECT * FROM sub_category";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}


const viewtotalSubCategory  = async function(req, res){
    let sqlquery = "SELECT count(*) as totalSubCategory from sub_category";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const viewSubcategorylist = async function(req, res){
    let sqlquery = "SELECT category_id, category_name FROM category";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const getSubcategorylist = async function(req, res){
    let sqlquery = "SELECT subCategory_id, subCategory_name FROM sub_category";
    await connection.query(sqlquery, function(error, result){
        if(error)
        console.log(error.sqlMessage);
        else
         res.send(result);  
         console.log(result);
    })
}

const addSubcategory = async (req, res) => {
    try {
    const data = [
    req.body.category_id,
    req.body.subCategory_id,
    req.body.subCategory_name,
    req.file.location,
    
    // product_add_date: req.body.product_add_date,
    ];
    const sqlQuery =
    "INSERT INTO sub_category values(?, ?, ?, ?)";
    await connection.query(sqlQuery, data, (error, result) => {
    console.log(result, "result");
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


    const updateSubcategory = async (req, res) => {
        try {
          const dataInfo = {         
            category_id: req.body.category_id,
            subCategory_name: req.body.subCategory_name,
            subCategory_image: req.file.location,
          }

          const subCategoryid = req.params.subCategory_id;
          const sqlQuery = "UPDATE sub_category SET? where subCategory_id = ?";
          await connection.query(
            sqlQuery,
            [dataInfo, subCategoryid],
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
      
const delSubcategory = async function(req, res){
    let id = [req.params.subCategory_id];
     let sqlquery = "DELETE FROM sub_category WHERE subCategory_id = ?";
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

module.exports={viewSubcategory, getSubcategorylist, viewtotalSubCategory, addSubcategory, updateSubcategory, delSubcategory, viewSubcategorylist}