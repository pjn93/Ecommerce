import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Sidebar from '../../Sidebar';
import "./AddUser.css";
import { useFormik} from 'formik';
import { userSchema } from "../schemas/Users";


const initialValues = {
  user_id: "u1",
  name: "",
  password: "",
}

const AddUser = () => {

  let [res, setRes] = useState();
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values, action) => {
      console.log(values, errors);
      action.resetForm()
    }
  }, []);


const data = {
  user_id: values.user_id,
  name: values.name,
  password: values.password
}

const  submit= async () => {
const response = await axios.post("http://localhost:7000/api/adduser", data);
console.log("api response", response.data, errors, {
  headers: {
    "Content-Type": "application/json"
  }
});
console.log(response.status);
if (response.status === 200) {
  setRes("Data inserted");
}
else {
  setRes("Try Again!!!!")
}
}

  return (
    <>
    <Sidebar>
      <div className="container">
        <h3 style={{textAlign:'center'}}>Add Users</h3>
        <form onSubmit={handleSubmit} style={{paddingLeft:'20px'}}>
          <div className="row">
            <div className="column">
              <label htmlFor="user_id" style={{fontSize:'15px'}}>
                User Id
              </label>
              <input
                type="text"
                placeholder="u1"
                id="user_id"
                name="user_id"
                value={values.user_id} onChange={handleChange} onBlur={handleBlur} autoComplete="off" 
              />
              {errors.user_id && touched.user_id ? (<p className="form-error">{errors.user_id}</p>) : null}
            </div>
            </div> 
            <div className="row">
            <div className="column">
              <label htmlFor="name" style={{fontSize:'15px', color:'black'}}>Name</label>
              <input
                type="text"
                placeholder="name"
                id="name"
                name="name"
                value={values.name} onChange={handleChange} onBlur={handleBlur} autoComplete="off" 
              />
              {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null}
            </div>
          </div> 
          <div className="row">
          <div className="column">
            <label htmlFor="password" style={{fontSize:'15px' , color:'black'}}>Password</label>
            <input type="password" id="password" placeholder="**********" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}
            autoComplete="off" />          
              {errors.password && touched.password ? (<p className="form-error">{errors.password}</p>) : null}

          </div>
          
          </div><br/>

          <p>{res}</p> 
          <div className="row" style={{ marginTop: "40px", paddingLeft: "0px", justifyContent: 'space-evenly', display:'flex'}}>
              <button className="button" style={{width:'120px'}} type="submit" onClick={submit}>
                <span>Save</span>
              </button>
          <button className='button' style={{width:'120px'}} variant="primary">
             <span>Reset</span>
          </button>

          </div>
        </form>
      </div>
      </Sidebar>
    </>
  );
};

export default AddUser;
