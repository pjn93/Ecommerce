import React,{ useEffect, useState } from 'react';
import {Form, Row, Col, Modal, Button} from 'react-bootstrap/';
import axios from 'axios';
import EDIT from '../images/edit.png';


const Update = (props) => {   
  const [newretailer_id, setNewretailer_id] = useState("")
  const [newshop_name, setNewshop_name] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [newowner_name, setNewowner_name] = useState("")
  const [newregistration_no, setNewregistration_no] = useState("")
  const [newregistration_document, setNewregistration_document] = useState("")
  const [newprofile_photo, setNewprofile_photo] = useState("")
  const [newgst_no, setNewgst_no] = useState("")
  const [newpan_no, setNewpan_no] = useState("")
  const [newaddress, setNewaddress] = useState("")
  const [newstate, setNewstate] = useState("")
  const [newcity, setNewcity] = useState("")
  const [newpincode, setNewpincode] = useState("")
  const [newcontact_no, setNewcontact_no] = useState("")
  const [newemail, setNewemail] = useState("")
  const [newregistration, setNewregistration] = useState("")
  const [newstatus, setNewstatus] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [res, setRes] = useState();

  const handleImage = (e) => {
    setNewregistration_document(e.target.files[0]);
    setNewprofile_photo(e.target.files[0])
  }

  
  async function updateData(retailer_id, shop_name, owner_name, registration_no,  gst_no, pan_no, address, state, city, pincode, contact_no, email, registration, status){
    console.log(retailer_id, shop_name, owner_name, registration_no, gst_no, pan_no, address, state, city, pincode, contact_no, email, registration, status)
    setNewretailer_id(retailer_id);
    setNewshop_name(shop_name);
    setNewowner_name(owner_name);
    setNewregistration_no(registration_no)
    setNewgst_no(gst_no);
    setNewpan_no(pan_no);
    setNewaddress(address);
    setNewstate(state);
    setNewcity(city);
    setNewpincode(pincode);
    setNewcontact_no(contact_no);
    setNewemail(email);
    setNewregistration(registration);
    setNewstatus(status);
    handleShow()
  }
  

 async function saveUpdatedData(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append("shop_name", newshop_name);
    formData.append("password", newpassword);
    formData.append("owner_name", newowner_name);
    formData.append("registration_no", newregistration_no);
    formData.append("registration_document", newregistration_document);
    formData.append("profile_photo", newprofile_photo);
    formData.append("gst_no", newgst_no);
    formData.append("pan_no", newpan_no);
     formData.append("address", newaddress);
    formData.append("state", newstate);
    formData.append("city", newcity);
    formData.append("pincode", newpincode); 
    formData.append("contact_no", newcontact_no);
    formData.append("email", newemail);
    formData.append("registration", newregistration);
    formData.append("status", newstatus);

    const configs = {
      headers: {'Content-Type': 'multipart/form-data' }
    };

    let response = await axios.put(`http://localhost:7000/api/updateretailer/${newretailer_id}`, formData, configs)
    
      console.log("response", response)
      console.log("formdata", formData)
      console.log(response.status);
if (response.status === 200) {
  setRes("Data inserted");
}
else {
  setRes("Try Again!!!!")
}
  }



  return (
    <div>
    <img src={EDIT} alt='eidt' width='30px'  onClick={()=>updateData(props.ownerid, props.shopname, props.ownername, props.registrationno, props.gst, props.pan, props.address, props.state,props.city, props.pincode, props.contact, props.email, props.registration, props.status)}/>
      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Update Retailer</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:'530px', marginLeft:'0px'}}>
      
        <form style={{ marginTop: "10px", height: "560px", width:'1000px' }}>
          <div className="row">
           
          <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="retailer_id">
                {" "}
                Retailer Id{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                id="retailer_id"
                name="retailer_id"
                value={newretailer_id}
                onChange={(e) => setNewretailer_id(e.target.value)}
                disabled={true} autoComplete="off"
              />
            
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="shop_name">
                {" "}
                Shop Name{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                id="shop_name"
                name="shop_name"
                value={newshop_name}
                onChange={(e) => setNewshop_name(e.target.value)}
                autoComplete="off"
              />
             
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="password">
                {" "}
                Password{" "}
              </label>
              <input
                style={{ height: "35px" }}
                placeholder='*******'
                type="password"
                id="password"
                name="password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                autoComplete="off"
              />
             
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
                id="owner_name"
                name="owner_name"
                value={newowner_name}
                onChange={(e) => setNewowner_name(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="registration_no">
                {" "}
                Registration No{" "}
              </label>
              <br />{" "}
              <input
                style={{ height: "35px" }}
                type="number"
                id="registration_no"
                name="registration_no"
                value={newregistration_no}
                onChange={(e) => setNewregistration_no(e.target.value)}
                autoComplete="off"
              />
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
                onChange={handleImage}
              />
            </div>
          </div>

          <div className="row">
           
            <div className="column">
            <label
                style={{ fontSize: "16px" }}
                htmlFor="profile_photo"
              >
  
                Profile Photo
              </label>
              <br />
              <input
                style={{ height: "35px" }}
                type="file"
                id="profile_photo"
                name="profile_photo"
                onChange={handleImage}
              />
              
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="gst_no">
                {" "}
                GST No{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                id="gst_no"
                name="gst_no"
                value={newgst_no}
                onChange={(e) => setNewgst_no(e.target.value)}
                autoComplete="off"
              />
              {/* {errors.name && touched.name ? (<p className="form-error">{errors.name}</p>) : null} */}
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="pan_no">
                {" "}
                PAN No{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                id="pan_no"
                name="pan_no"
                value={newpan_no}
                onChange={(e) => setNewpan_no(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

         
          <div className="row">
          <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="address">
                {" "}
                Address{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                id="address"
                name="address"
                value={newaddress}
                onChange={(e) => setNewaddress(e.target.value)}
                autoComplete="off"
              />
             
            </div>
            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="state">
                {" "}
                State{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                id="state"
                name="state"
                value={newstate}
                onChange={(e) => setNewstate(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="column">
            <label style={{ fontSize: "16px" }} htmlFor="city">
                {" "}
                City{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                id="city"
                name="city"
                value={newcity}
                onChange={(e) => setNewcity(e.target.value)}
                autoComplete="off"
              />
            </div>
           
          </div>

          <div className="row">
          <div className="column">
          <label style={{ fontSize: "16px" }} htmlFor="pincode">
                {" "}
                PinCode{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                id="pincode"
                name="pincode"
                value={newpincode}
                onChange={(e) => setNewpincode(e.target.value)}
                autoComplete="off"
            />
            </div>
            <div className="column">
            <label style={{ fontSize: "16px" }} htmlFor="contact_no">
                {" "}
                Contact No{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="number"
                id="contact_no"
                name="contact_no"
                value={newcontact_no}
                onChange={(e) => setNewcontact_no(e.target.value)}
                autoComplete="off"
              />
             
            </div>

            <div className="column">
              <label style={{ fontSize: "16px" }} htmlFor="email">
                {" "}
                Email{" "}
              </label>
              <input
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  height: "35px",
                  paddingTop: "3px",
                }}
                type="email"
                id="email"
                name="email"
                defaultValue={newemail}
                onChange={(e) => setNewemail(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>


          <div className="row">
          <div className="column">
          <label style={{ fontSize: "16px" }} htmlFor="registration">
                {" "}
                Registration Date{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                id="registration"
                name="registration"
                value={newregistration}
                onChange={(e) => setNewregistration(e.target.value)}
                autoComplete="off"
            />
            </div>
            <div className="column">
            <label style={{ fontSize: "16px" }} htmlFor="status">
                {" "}
                Status{" "}
              </label>
              <input
                style={{ height: "35px" }}
                type="text"
                id="status"
                name="status"
                value={newstatus}
                onChange={(e) => setNewstatus(e.target.value)}
                autoComplete="off"
              />
             
            </div>
          </div>


          <p>{res}</p>
        
        </form>
        </Modal.Body>
        <Modal.Footer>

<Button variant="secondary" onClick={handleClose}>

  Close

</Button>

<Button variant="primary" onClick={(e)=>saveUpdatedData(e)}>

  Save

</Button>

</Modal.Footer>
</Modal>
    </div>
  )
}

export default Update;
