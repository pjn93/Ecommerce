import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Card,
  CardContent,
} from "@mui/material/";
import { Form, Row, Col, Modal, Button } from "react-bootstrap/";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { userSchema } from "../schemas/Users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsers } from "../../store/slices/userSlice";
import UPDATE from "../images/edit.png";
import moment from "moment/moment";
import Sidebar from "../../Sidebar";
import ADD from "../images/add.png";
import EYE from "../images/Eye.png";
import { Switch } from "antd";
import "./AddUser.css";

const ViewUser = () => {
  async function activestatus(user_id, e) {
    // e.preventDefault();
    let response = await axios.put(
      `http://localhost:7000/api/updateuserstatus?status=active&user_id=${user_id}`
    );
    console.log(response);
  }

  async function deactivestatus(user_id, e) {
    let response = await axios.put(
      `http://localhost:7000/api/updateuserstatus?status=deactivate&user_id=${user_id}`
    );
    console.log(response);
  }

  const navigate = useNavigate();
  const goToAbout = () => {
    // alert("hi");
    navigate("/components/user/AddUser");
  };
  //////////////////////////below states for update////////////////////////

  const [newuser_id, setNewuser_id] = useState("");
  const [newname, setNewname] = useState("");
  const [newpassword, setNewpassword] = useState("");

  ///// state for search ////////////
  const [searchTerm, setSearchTerm] = useState("");
  // ///////////////////////////////

  //////////////////////////model'state for update///////////////////////////////
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //////////////////////////state for viewRole in assign form///////////////////////////////
  const [item, setItem] = useState([]);
  const [view, setView] = useState(false);
  const closeHandle = () => setView(false);
  const showHandle = () => setView(true);

  ///////////////////////////state for view role /////////////////////////
  const [rows1, setRows1] = useState([]);

  //////////////////////////state for assign role///////////////////////////////
  const [get, setGet] = useState(false);
  const closeModel = () => setGet(false);
  const showModel = () => setGet(true);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const assignRole = (user_id, name) => {
    setGet(true);
    setUserId(user_id);
    setUserName(name);
  };

  ///////////////////////////////////api for assign role////////////////////////
  const initialValues = {
    user_id: "",
    role_id: "",
  };

  let [res, setRes] = useState();
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values, action) => {
      console.log("Hello World!", values);
      action.resetForm();
    },
  });

  let [roleid, setRoleid] = useState();
  const [role, setRole] = useState([]);

  const data = {
    role_id: roleid,
    user_id: userId,
  };

  const getRole = async () => {
    const res = await axios.get("http://localhost:7000/api/getrole");
    // console.log(res.data);
    setRole(res.data);
  };
  useEffect(() => {
    getRole();
    //  showModel()
  }, []);

  async function postRoleAssign() {
    let res = await axios.post(
      "http://localhost:7000/api/addroleassign",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res.status);
    if (res.status === 200) {
      setRes("Data Inserted");
    } else {
      setRes("Try again!!!");
    }
  }

  ////////////////////////////////////// View Profile ////////////////////////////////////////////////////////
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [userprofileid, setUserprofileid] = useState([]);
  const [userprofiledata, setUserprofiledata] = useState([]);
  const [uid, setUId] = useState();

  async function userProfile1(user_id) {
    setUserprofileid(user_id);
    // handleShow2(true);
    let response = await axios.get(
      `http://localhost:7000/api/viewuserdetail?user_id=${user_id}`
    );
    setUserprofiledata(response.data);
    console.log(userprofiledata);
    // handleShow2(true);

    handleShow2(true);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// function for update ////////////////////////////////////////////////////
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

  async function viewUserRole(user_id) {
    setUId(user_id);
    await axios
      .get(`http://localhost:7000/api/viewuserrole/${user_id}`)
      .then((response) => {
        setRows1(response.data);
      });
    showHandle();
  }

  async function handleDelete(role_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

    const del = await axios.delete(
      `http://localhost:7000/api/revokeassignrole?user_id=${uid}&role_id=${role_id}`
    );
    console.log(del);
    //  .then(() => {
    //   fetchData();
    //  });
  }

  async function user() {
    await axios.get("http://localhost:7000/api/viewuser").then((response) => {
      setRows(response.data);
    });
  }

  useEffect(() => {
    user();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Sidebar>
        {/* ////////////////////////Modal 1//////////////////////////////// */}
        <Modal show={view} onHide={closeHandle} style={{ marginTop: "200px" }}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h3 style={{ color: "black", float: "left" }}>Role name :</h3>
            <h3 style={{ color: "black", float: "right" }}>Remove Role</h3>

            <div style={{ marginTop: "50px" }}>
              {rows1.map((items1, index) => {
                return (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ fontSize: "20px", marginLeft: "50px" }}>
                      {items1.roleName}{" "}
                    </p>
                    <span>
                      <CloseButton
                        onClick={(e) => {
                          handleDelete(items1.role_id);
                        }}
                      />{" "}
                    </span>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeHandle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ////////////////////////Modal 2////////////////////////////////////// */}
        <Modal show={get} onHide={closeModel}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Role</Modal.Title>
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="column">
                    <label htmlFor="userId">
                      User Id <span style={{ color: "white" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="userId"
                      name="userId"
                      onChange={(e) => setUserId(e.target.value)}
                      value={userId}
                      onBlur={handleBlur}
                      required
                      disabled
                    />
                  </div>
                  <div className="column">
                    <label htmlFor="userName">User Name</label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      onChange={handleChange}
                      value={userName}
                      required
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <label>Role Names</label>
                    <select
                      id="roleid"
                      name="roleid"
                      onChange={(e) => setRoleid(e.target.value)}
                      value={values.roleid}
                      onBlur={handleBlur}
                      style={{ display: "block", border: "1px solid grey" }}
                    >
                      <option>Choose Roles</option>
                      {role.map((item, index) => {
                        return (
                          <option value={item.role_id}>
                            <div style={{ display: "flex" }}>
                              <div>{item.role_id}</div>
                              <div> {item.roleName}</div>
                            </div>
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <p>{res}</p>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModel}>
              Close
            </Button>
            <Button variant="primary" onClick={() => postRoleAssign()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ///////////////////////////////Modal 3/////////////////////////////// */}
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

        {/* ///////////////////////////////////Model 4 ////////////////////////////////// */}

        <Modal
          show={show2}
          onHide={handleClose2}
          style={{
            width: "1400px",
            paddingLeft: "0",
            marginLeft: "-50px",
            marginTop: "60px",
          }}
        >
          <Modal.Header
            closeButton
            style={{
              width: "800px",
              marginTop: "0px",
              backgroundColor: "#fff",
            }}
          >
            <Modal.Title>User Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: "800px", backgroundColor: "#fff" }}>
            <Table style={{ border: "2px solid grey" }}>
              <thead style={{ border: "2px solid grey" }}>
                <tr style={{ border: "2px solid grey" }}>
                  <th> Id</th>
                  <th style={{ marginLeft: "20px", border: "2px solid grey" }}>
                    Mobile No
                  </th>
                  <th style={{ marginLeft: "20px", border: "2px solid grey" }}>
                    Email
                  </th>
                  <th style={{ border: "2px solid grey" }}>Profile Photo</th>
                  <th style={{ border: "2px solid grey" }}>Adhaar No</th>
                  <th style={{ border: "2px solid grey" }}>Address</th>
                  <th style={{ border: "2px solid grey" }}>State</th>
                  <th style={{ border: "2px solid grey" }}>City</th>
                  <th style={{ border: "2px solid grey" }}>Pin Code</th>
                </tr>
              </thead>
              <tbody style={{ border: "2px solid grey" }}>
                {userprofiledata.map((value) => {
                  return (
                    <tr>
                      <td style={{ border: "2px solid grey" }}>
                        {value.user_id}
                      </td>
                      <td style={{ border: "2px solid grey" }}>
                        {value.mobile_no}
                      </td>
                      <td style={{ border: "2px solid grey" }}>
                        {value.email}
                      </td>
                      <td style={{ border: "2px solid grey" }}>
                        {value.profile_photo}
                      </td>
                      <td style={{ border: "2px solid grey" }}>
                        {value.adhar}
                      </td>
                      <td style={{ border: "2px solid grey" }}>
                        {value.address}
                      </td>
                      <td style={{ border: "2px solid grey" }}>
                        {value.state}
                      </td>
                      <td style={{ border: "2px solid grey" }}>{value.city}</td>
                      <td style={{ border: "2px solid grey" }}>
                        {value.pincode}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer style={{ width: "800px", backgroundColor: "#fff" }}>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ///////////////////////////////////Model 4 ////////////////////////////////// */}

        <div
          style={{
            width: "80%",
            marginLeft: "130px",
            marginTop: "0px",
            height: " 620px",
            // backgroundColor: 'yellow'
          }}
        >
          <Row style={{ marginLeft: "0px", height: "50px" }}>
            <Col>
              <Form>
                <h3
                  style={{
                    textAlign: "center",
                    color: "#002140",
                    marginTop: "-20px",
                  }}
                >
                  <b>Users</b>{" "}
                </h3>
              </Form>
            </Col>
          </Row>
          <div
            style={{
              marginLeft: "705px",
              marginTop: "-30px",
              height: "40px",
              width: "350px",
              // backgroundColor:'green'
            }}
          >
            <Row>
              <div
                style={{
                  display: "flex",
                  marginTop: "0px",
                  marginLeft: "98px",
                  width: "280px",
                  height: "40px",
                  // backgroundColor:'yellow'
                }}
              >
                <span>
                  <img
                    src={ADD}
                    style={{ marginLeft: "20px", marginTop: "5px" }}
                    alt="addproduct"
                    width="40px"
                    height="35px"
                    onClick={goToAbout}
                  />
                </span>

                <input
                  type="text"
                  style={{
                    marginTop: "0px",
                    marginLeft: "7px",
                    width: "200px",
                    height: "40px",
                    border: "1px solid #e3e1e1",
                  }}
                  id="myInput"
                  placeholder="Search User.."
                  title="Type name"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                ></input>
              </div>
            </Row>
          </div>

          <div style={{ marginTop: "0px", height: "400px", marginLeft: "0px" }}>
            <Card sx={{ minWidth: 300, p: 2 }}>
              <CardContent>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer
                    sx={{ maxHeight: 400, backgroundColor: "#e6ecf0" }}
                  >
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <h6>
                              <b>User Id</b>
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6>
                              <b>Full name</b>
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6>
                              <b>Roles</b>
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6>
                              <b>Status</b>
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6>
                              <b>CreatedOn</b>
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6>
                              <b>Action</b>
                            </h6>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .filter((row) => {
                            if (searchTerm === "") {
                              return row;
                            } else if (
                              row.user_id
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              row.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                              return row;
                            }
                          })
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.user_id}
                              >
                                <TableCell
                                  align="center"
                                  style={{ fontSize: "13px" }}
                                >
                                  {row.user_id}{" "}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: "13px" }}
                                >
                                  {row.name}{" "}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: "13px" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <button
                                      style={{ height: "35px" }}
                                      className="button"
                                      onClick={() => viewUserRole(row.user_id)}
                                    >
                                      <p style={{ fontSize: "13px" }}>View</p>
                                    </button>
                                    <button
                                      style={{ height: "35px" }}
                                      className="button"
                                      onClick={() =>
                                        assignRole(row.user_id, row.name)
                                      }
                                    >
                                      <p style={{ fontSize: "13px" }}>Assign</p>
                                    </button>
                                  </div>
                                </TableCell>
                                {/* {
  
  (row.status='active')?<td style={{color:'green'}}>Active</td>:<td style={{color:'red'}}>Deactive</td>
 } */}
                                <TableCell
                                  align="center"
                                  style={{ fontSize: "13px" }}
                                >
                                  {row.status === "deactivate" ? (
                                    <Switch
                                      onChange={(e) =>
                                        activestatus(row.user_id)
                                      }
                                    />
                                  ) : (
                                    <Switch
                                      onClick={(e) =>
                                        deactivestatus(row.user_id)
                                      }
                                      defaultChecked
                                    />
                                  )}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: "13px" }}
                                >
                                  <div
                                    style={{
                                      height: "50px",
                                      width: "130px",
                                      marginLeft: "20px",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {moment(row.createdOn).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                  </div>{" "}
                                </TableCell>
                                <TableCell align="center">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span>
                                      <img
                                        src={UPDATE}
                                        alt="addproduct"
                                        width="27px"
                                        height="27px"
                                        onClick={() =>
                                          updateData(
                                            row.user_id,
                                            row.name,
                                            row.password,
                                            row.createdOn
                                          )
                                        }
                                      />
                                    </span>
                                    <img
                                      src={EYE}
                                      alt="eye"
                                      width="30px"
                                      height="30px"
                                      style={{ marginTop: "-2px" }}
                                      onClick={() => userProfile1(row.user_id)}
                                    />
                                    {/* <span><ViewProfile/></span>  */}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </CardContent>
            </Card>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default ViewUser;
