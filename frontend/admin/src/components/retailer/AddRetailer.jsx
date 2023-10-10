import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Sidebar from '../../Sidebar';
// import "./AddUser.css";

const AddRetailer = () => {
  let [res, setRes] = useState();
  const [retailer_id, setRetailer_id] = useState("");
  const [shop_name, setShopname] = useState("");
  const [password, setPassword] = useState("");
  const [owner_name, setOwnerName] = useState("");
  const [registration_no, setRegistrationNo] = useState("");
  const [registration_document, setRegistrationDocument] = useState("");
  const [profile_photo, setProfilePhoto] = useState("");
  const [gst_no, setGstNo] = useState("");
  const [pan_no, setPanNo] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const handleImage = (e) => {
    setRegistrationDocument(e.target.files[0]);
    setProfilePhoto(e.target.files[0]);
  };

  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("retailer_id", retailer_id);
    formData.append("shop_name", shop_name);
    formData.append("password", password);
    formData.append("owner_name", owner_name);
    formData.append("registration_no", registration_no);
    formData.append("registration_document", registration_document);
    formData.append("profile_photo", profile_photo);
    formData.append("gst_no", gst_no);
    formData.append("pan_no", pan_no);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pincode", pincode);
    formData.append("contact_no", contact_no);
    formData.append("email", email);
    const configs = {
      "content-Type": "multiple/form-data",
    };
    const apiData = await axios.post(
      "http://localhost:7000/api/addretailer",
      formData,
      configs
    );
    console.log(apiData, "apidata");
    setRetailer_id("");
    setShopname("");
    setPassword("");
    setOwnerName("");
    setRegistrationNo("");
    setRegistrationDocument("");
    setProfilePhoto("");
    setGstNo("");
    setPanNo("");
    setAddress("");
    setState("");
    setCity("");
    setPincode("");
    setContactNo("");
    setEmail("");
    
    console.log(apiData.status);
    if (apiData.status === 200) {
      setRes("Data inserted");
    } else {
      setRes("Try Again!!!!");
    }
  };

  return (
    <>
    <Sidebar>
      <h3 style={{ textAlign: "center", marginTop: "5px" }}>Add Retailer</h3>
      <div
        className="container"
        style={{
          height: "550px",
          paddingTop: "10px",
          marginTop: "30px",
          width: "70%",
        }}
      >
        <Form
          onSubmit={submitData}
          style={{ marginTop: "10px", height: "560px" }}
        >
          <div className="row">
           
          <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="retailer_id">
                {" "}
                Retailer Id{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                placeholder="o1"
                id="retailer_id"
                name="retailer_id"
                value={retailer_id}
                onChange={(e) => setRetailer_id(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="shop_name">
                {" "}
                Shop Name{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                placeholder="Redmi"
                id="shop_name"
                name="shop_name"
                value={shop_name}
                onChange={(e) => setShopname(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>

            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="password">
                {" "}
                Password{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="password"
                placeholder="*********"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="owner_name">
                {" "}
                Owner Name <span style={{ color: "white" }}>*</span>{" "}
              </label>
              <br />{" "}
              <input
                style={{ height: "35px" }}
                type="text"
                placeholder="owner1"
                id="owner_name"
                name="owner_name"
                value={owner_name}
                onChange={(e) => setOwnerName(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.user_id && touched.user_id ? (<p className="form-error">{errors.user_id}</p>) : null} */}
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="registration_no">
                {" "}
                Registration No{" "}
              </label>
              <br />{" "}
              <input
                style={{ height: "35px" }}
                type="text"
                placeholder="4j45ij3j4"
                id="registration_no"
                name="registration_no"
                value={registration_no}
                onChange={(e) => setRegistrationNo(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>

            <div className="column">
              <label
                style={{ fontSize: "16px" }}
                htmlFor="registration_document"
              >
  
                Registration Document
              </label>
              <br />
              <input
                style={{ height: "35px" }}
                type="file"
                id="registration_document"
                name="registration_document"
                defaultValue={registration_document}
                onChange={handleImage}
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
          </div>

          <div className="row">
           
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="gst_no">
                {" "}
                GST No{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                placeholder="54553323"
                id="gst_no"
                name="gst_no"
                value={gst_no}
                onChange={(e) => setGstNo(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="pan_no">
                {" "}
                Pan No{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                placeholder="3242352"
                id="pan_no"
                name="pan_no"
                value={pan_no}
                onChange={(e) => setPanNo(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="state">
                {" "}
                State{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                placeholder="M.P."
                id="state"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
          </div>

         
          <div className="row">
          <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="city">
                {" "}
                City{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                placeholder="Bhopal"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="pincode">
                {" "}
                PinCode{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                placeholder="462001"
                id="pincode"
                name="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>

            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="contact_no">
                {" "}
                Contact No{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                placeholder="990348682"
                id="contact_no"
                name="contact_no"
                value={contact_no}
                onChange={(e) => setContactNo(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
           
          </div>

          <div className="row">
          <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="email">
                {" "}
                Email{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="email"
                placeholder="@gmail.com"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="address">
                {" "}
                Address{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                placeholder="Colony name"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>

            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="profile_photo">
                {" "}
                Profile Photo{" "}
              </label>
              <input
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  height: "35px",
                  paddingTop: "3px",
                }}
                type="file"
                id="profile_photo"
                name="profile_photo"
                defaultValue={profile_photo}
                onChange={handleImage}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
          </div>

          <p>{res}</p>
          <div
            className="row"
            style={{
              marginLeft: "0px",
              marginTop: "40px",
              paddingLeft: "0px",
              justifyContent: "space-evenly",
              display: "flex",
            }}
          >
            {/* <button className="button" style={{width:'80px', height:'40px', paddingTop:'-40px'}} type="submit" onClick={submit}>
                <span style={{ backgroundColor:'yellow'}}>Save</span>
              </button> */}
            <button
              className="button"
              style={{ width: "80px", height: "40px", paddingTop: "4px" }}
              type="submit"
            >
              <span>Save</span>
            </button>
            <button
              className="button"
              style={{
                width: "80px",
                height: "40px",
                paddingTop: "4px",
                paddingLeft: "13px",
              }}
              variant="primary"
            >
              <span>Reset</span>
            </button>
          </div>
        </Form>
      </div>
      </Sidebar>
    </>
  );
};

export default AddRetailer;
