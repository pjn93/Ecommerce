const connection = require("../modal/Dbconnect");

const viewCategory = async function (req, res) {
  let sqlquery = "SELECT * FROM category";
  await connection.query(sqlquery, function (error, result) {
    if (error) console.log(error.sqlMessage);
    else res.send(result);
    console.log(result);
  });
};

const viewtotalCategory = async function (req, res) {
  let sqlquery = "SELECT count(*) as totalCategory from category";
  await connection.query(sqlquery, function (error, result) {
    if (error) console.log(error.sqlMessage);
    else res.send(result);
    console.log(result);
  });
};

const addCategory = async (req, res) => {
  try {
    const data = [
      req.body.category_id,
      req.body.category_name,
      req.file.location,
      req.body.gst,

      // product_add_date: req.body.product_add_date,
    ];
    const sqlQuery = "INSERT INTO category values(?, ?, ?, ?)";
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

const updateCategory = async (req, res) => {
  try {
    const dataInfo = {
    
      category_name: req.body.category_name,
      category_image: req.file.location,
      gst: req.body.gst,
    }
    const Categoryid = req.params.category_id;
    const sqlQuery = "UPDATE category SET? where category_id=?";
    await connection.query(
      sqlQuery,
      [dataInfo, Categoryid],
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

const viewcategoryList = async function (req, res) {
  let sqlquery = "select category_id, category_name from category";
  await connection.query(sqlquery, function (error, result) {
    console.log("result", result);
    if (error) {
      console.log(error.sqlMessage);
    } else {
      res.send(result);
      console.log("hello");
    }
  });
};

const delCategory = async function (req, res) {
  let id = [req.params.category_id];
  let sqlquery = "DELETE FROM category WHERE category_id = ?";
  await connection.query(sqlquery, [id], function (error, result) {
    console.log("result", result);
    if (error) {
      console.log(error.sqlMessage);
    } else {
      res.send(result);
      console.log("hello");
    }
  });
};

module.exports = {
  viewCategory,
  viewtotalCategory,
  addCategory,
  viewcategoryList,
  updateCategory,
  delCategory,
};
