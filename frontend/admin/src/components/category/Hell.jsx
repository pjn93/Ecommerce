import { useFormik } from "formik";
import { categorySchema } from "../schemas/Category";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const initialValues = {
  category_id: "c1",
  category_name: " ",
  category_image: " ",
  gst: " "
};

const AddCategory = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik(
      {
        initialValues: initialValues,
        validationSchema: categorySchema,
        onSubmit: (values, action) => {
          console.log(values, errors);
          action.resetForm()
        }
      },
      []
    );

  const data = {
    category_id: values.category_id,
    category_name: values.category_name,
    category_image: values.category_image,
    gst: values.gst
  };

  let [res, setRes] = useState();

  let API = "http://localhost:7000/api/addcategory";
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
      <div className="container">
        <h1>Add Product Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <label htmlFor="category_id">
                Category Id <span style={{ color: "white" }}>*</span>
              </label>
              <input
                type="text"
                id="category_id"
                name="category_id"
                onChange={handleChange}
                value={values.category_id}
                onBlur={handleBlur}
                required
              />
              {errors.category_id && touched.category_id ? (<p className="form-error">{errors.category_id}</p>) : null}

            </div>
            <div className="column">
              <label htmlFor="category_name">Category Name</label>
              <input
                type="text"
                placeholder="Electronics...."
                id="category_name"
                name="category_name"
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
                required
              />
              {errors.category_name && touched.category_name ? (<p className="form-error">{errors.category_name}</p>) : null}

            </div>
          </div>

          <div className="row">
            <div className="column">
              <label htmlFor="gst">GST</label>
              <input
                type="float"
                placeholder="22.3"
                id="gst"
                name="gst"
                onChange={handleChange}
                value={values.gst}
                onBlur={handleBlur}
              />
              {errors.gst && touched.gst ? (<p className="form-error">{errors.gst}</p>) : null}

            </div>

            {/* <div className="column">
              <label htmlFor="status">Category Image</label>
              <input
                type="file"
                id="category_image"
                name="category_image"
                onChange={handleChange}
                value={values.category_image}
                onBlur={handleBlur}
              />
            </div> */}
            <div className="column">
              <label style={{fontSize:'16px'}}  htmlFor="category_image"> Category Image </label>
              <input style={{backgroundColor:'#fff', color:'black'}} type="file"  id="category_image" name="category_image" value={values.category_image} onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
          </div>

       

          <p>{res}</p>
          <div
            className="row"
            style={{ marginTop: "50px", paddingLeft: "250px" }}
          >
            <div className="column">
              <button className="button" type="submit" onClick={setData}>
                <span>Save</span>
              </button>
            </div>
            <div className="column">
              <button className="button" type="reset">
                <span>Reset</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
