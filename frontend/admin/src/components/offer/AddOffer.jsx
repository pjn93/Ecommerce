import { useFormik } from "formik";
// import { signUpSchema } from "../schemas";
import Sidebar from '../../Sidebar';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const initialValues = {
  offer_code: " ",
  offer_name: " ",
  valid_from: " ",
  valid_upto: " ",
  discount_percentage: " ",
  flat_discount: " ",
  status: " ",
};

const AddOffer = () => {
  const { values, handleBlur, handleChange, handleSubmit } =
    useFormik(
      {
        initialValues: initialValues,
        // validationSchema: signUpSchema,
        onSubmit: (values) => {
          console.log("Hello World!", values);
        },
      },
      []
    );

  const data = {
    offer_code: values.offer_code,
    offer_name: values.offer_name,
    valid_from: values.valid_from,
    valid_upto: values.valid_upto,
    discount_percentage: values.discount_percentage,
    flat_discount: values.flat_discount,
    status: values.status
  };

  let [res, setRes] = useState();

  let API = "http://localhost:7000/api/addoffer";
  async function setData() {
    let response = await axios.post(API, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.status);
    if (response.status === 200) {
      setRes("Data Inserted");
    } else {
      setRes("Try again!!!");
    }
  }

  return (
    <>
    <Sidebar>
      <div className="container" style={{width:'50%'}}>
        <h3 style={{textAlign:'center', marginTop:'-10px'}}>Add Offer</h3>
        <form onSubmit={handleSubmit} style={{marginTop:'20px', height:'450px'}}>
          <div className="row" style={{display:'flex', marginLeft:'0px', width:'100%', justifyContent:'space-between'}}>
            <div className="column" style={{ width:'40%'}}>
              <label  style={{fontSize:'16px'}}  htmlFor="offer_code">
               Offer Code
              </label><br/>
              <input
                type="text"
                placeholder="flat200off"
                id="offer_code"
                name="offer_code"
                onChange={handleChange}
                value={values.offer_code}
                onBlur={handleBlur}
                required
              />
            </div>

            <div className="column"  style={{ width:'40%'}}>
              <label  style={{fontSize:'16px'}}  htmlFor="offer_name">Offer Name</label>
              <input
                type="text"
                placeholder="diwali offer"
                id="offer_name"
                name="offer_name"
                onChange={handleChange}
                value={values.offer_name}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          <div className="row" style={{display:'flex', marginLeft:'0px', width:'100%', justifyContent:'space-between'}}>
            <div className="column" style={{ width:'40%'}}>
              <label  style={{fontSize:'16px'}}  htmlFor="valid_from">Valid From</label>
              <input
                type="date"
                id="valid_from"
                name="valid_from"
                onChange={handleChange}
                value={values.valid_from}
                onBlur={handleBlur}
              />
            </div>
            <div className="column"  style={{width:'40%'}}>
              <label  style={{fontSize:'16px'}}  htmlFor="valid_upto">Valid Upto</label>
              <input
                type="date"
                id="valid_upto"
                name="valid_upto"
                onChange={handleChange}
                value={values.valid_upto}
                onBlur={handleBlur}
              />
            </div>
          </div>

          
          <div className="row" style={{display:'flex', marginLeft:'0px', width:'100%', justifyContent:'space-between'}}>
          <div className="column"  style={{width:'40%'}}>
              <label  style={{fontSize:'16px'}}  htmlFor="discount_percentage">Discount Percentage</label>
              <input
                type="number"
                onChange={handleChange}
                value={values.discount_percentage}
                onBlur={handleBlur}
                id="discount_percentage"
              />
            </div>
  
            <div className="column"  style={{width:'40%'}}>

              <label style={{fontSize:'16px'}} htmlFor="flat_discount">Flat Discount</label>
              <input
                type="number"
                onChange={handleChange}
                value={values.flat_discount}
                onBlur={handleBlur}
                id="flat_discount"
              />
            </div>
          </div>

          <div className="row" style={{display:'flex', marginLeft:'0px', width:'100%', justifyContent:'space-between'}}>

          <div className="column">
              <label style={{fontSize:'16px'}}  htmlFor="status">Status</label>
              <select
                onChange={handleChange}
                value={values.status}
                name="status"
                id="status"
                onBlur={handleBlur}
              >
                <option>Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              </div>
            </div>

          <p>{res}</p>
          <div className="row" style={{display:'flex', marginTop:'50px', marginLeft:'0px', width:'100%', justifyContent:'space-between'}}>
          <div className="column"  style={{ width:'40%'}}>
              <button className="button" style={{marginLeft:'174px'}} type="submit" onClick={setData}>
                <span>Save</span>
              </button>
            </div>
            <div className="column"  style={{ width:'40%'}}>
              <button className="button" type="reset">
                <span>Reset</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      </Sidebar>
    </>
  );
};

export default AddOffer;
