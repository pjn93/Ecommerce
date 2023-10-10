import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import UPDATE from "../images/edit.png";

const UpdateUser = ({id, name}) => {
  console.log(id, name, "ID & NAME")
  const [newuser_id, setNewuser_id] = useState("");
  const [newname, setNewname] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function updateData(user_id, name, password) {
    console.log(user_id, name, password);
    setNewuser_id(user_id);
    setNewname(name);
    setNewpassword(password);
    handleShow();
  }

  async function saveUpdatedData() {
    let response = await axios.put(
      `http://localhost:7000/api/modifyuser/${newuser_id}`,
      {
        name: newname,
        password: newpassword,
      }
    );
    console.log(response);
  }
  return (
    <div>
      <img
        src={UPDATE}
        alt="addproduct"
        width="27px"
        height="27px"
        onClick={updateData}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Users</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "530px" }}>
          <div
            className="container"
            style={{
              paddingTop: "0px",
              borderRadius: "0px",
              width: "500px",
              marginLeft: "-25px",
              height: "530px",
              marginTop: "0px",
            }}
          >
            <form>
              <div className="row">
                <div className="column">
                  <label htmlFor="user_id">
                    User Id <span style={{ color: "white" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="u1"
                    id="user_id"
                    name="user_id"
                    value={newuser_id}
                    onChange={(e) => setNewuser_id(e.target.value)}
                    disabled="true"
                    required
                  />
                </div>
                <div className="column">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="name"
                    id="name"
                    name="name"
                    value={newname}
                    onChange={(e) => setNewname(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={() => saveUpdatedData()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateUser;
