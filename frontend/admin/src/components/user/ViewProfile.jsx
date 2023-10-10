import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Sidebar from '../../Sidebar';
import Modal from "react-bootstrap/Modal";
import EYE from "../images/Eye.png";
import axios from "axios";

const ViewProfile = () => {
  const [rows2, setRows2] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect((user_id) => {
    axios
      .get(`http://localhost:7000/api/viewuserprofile/${user_id}`)
      .then((response) => {
        setRows2(response.data);
      });
  }, []);

  return (
    <>
    <Sidebar>
    <div>
      <img
        src={EYE}
        alt="eye"
        width="40px"
        height="40px"
        style={{ marginTop: "-2px" }}
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose} style={{ marginTop: "20px" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "550px", width: "650px" }}>
          <div
            className="container"
            style={{
              width: "490px",
              marginLeft: "-110px",
              height: "550px",
              paddingTop: "15px",
            }}
          >
            {rows2.map((row2, index) => {
              return (
                <>
                  <div className="row">
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>User_id</h3>
                      <p>{row2.user_id}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Mobile No.</h3>
                      <p>{row2.mobile_no}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Email</h3>
                      <p>{row2.email}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Profile Photo</h3>
                      <p>{row2.profile_photo}</p>
                    </div>

                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Adhar</h3>
                      <p>{row2.adhar}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Address</h3>
                      <p>{row2.address}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>State</h3>
                      <p>{row2.state}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>City</h3>
                      <p>{row2.city}</p>
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Pincode</h3>
                      <p>{row2.pincode}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </Sidebar>
    </>
  );
};

export default ViewProfile;
