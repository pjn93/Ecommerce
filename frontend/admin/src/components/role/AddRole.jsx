import { useFormik } from "formik";
import { roleSchema } from "../schemas/Role";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Sidebar from '../../Sidebar';



const initialValues = {
  role_id: "01",
  roleName: " "
};

const AddRole = () => {
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik(
      {
        initialValues: initialValues,
        validationSchema: roleSchema,
        onSubmit: (values, action) => {
          console.log(values, errors);
          action.resetForm()
        },
      },
      []
    );

  const data = {
    role_id: values.role_id,
    roleName: values.roleName,
  };

  let [res, setRes] = useState();

  let API = "http://localhost:7000/api/addrole";
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
      <div className="container" style={{height:'480px',paddingTop:'35px'}} >
        <h3 style={{textAlign:'center'}}>Add Roles</h3>
        <form onSubmit={handleSubmit} style={{ marginTop:'40px',height:'350px', paddingLeft:'20px'}}>
          <div className="row">
            <div className="column">
              <label htmlFor="role_id" style={{fontSize:'15px'}}>
                Role Id
              </label>
              <input
                type="text"
                placeholder="01"
                id="role_id"
                name="role_id"
                onChange={handleChange}
                value={values.role_id}
                onBlur={handleBlur}
                required
              />
              {errors.role_id && touched.role_id ? (<p className="form-error">{errors.role_id}</p>) : null}

            </div>
            </div>
            <div className="row" style={{marginTop:'40px'}}>
            <div className="column">
              <label htmlFor="name" style={{fontSize:'15px'}}>Role Name</label>
              <input
                type="text"
                placeholder="roleName"
                id="roleName"
                name="roleName"
                onChange={handleChange}
                value={values.roleName}
                onBlur={handleBlur}
                required
              />
              {errors.roleName && touched.roleName ? (<p className="form-error">{errors.roleName}</p>) : null}

            </div>
          </div>

          
            

          <p>{res}</p>
          <div className="row" style={{ marginTop: "40px", justifyContent: 'space-evenly', display:'flex', marginTop: '60px' }}
          >
            <div className="column" style={{width:'130px'}}>
              <button className="button" type="submit" onClick={setData}>
                <span>Save</span>
              </button>
            </div>
            <div className="column" style={{ width:'130px'}}>
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

export default AddRole;
