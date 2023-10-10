import React,{ useEffect,useState } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form,Row,Col,Modal, Button} from 'react-bootstrap/';
import axios from 'axios';
import moment from "moment/moment";
import Sidebar from '../Sidebar';
import {useNavigate} from 'react-router-dom';
import { Switch } from "antd";
import ADD from './images/add.png';
import EDIT from './images/edit.png';



const Customer = () => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newemail, setNewemail] = useState("")
  const [newmobile_no, setNewmobile_no] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [newstatus, setNewstatus] = useState("")


  async function updateData(email, mobile_no, password, status){
    console.log(email, mobile_no, password, status)
    setNewemail(email);
    setNewmobile_no(mobile_no);
    setNewpassword(password);
    setNewstatus(status);
    handleShow()
  }

 async function saveUpdatedData(){
    let response = await axios.put(`http://localhost:7000/api/updatecustomer/${newmobile_no}`, {
      email: newemail,
      password: newpassword,
      status: newstatus
      })
      console.log(response)
  }


  async function activestatus(email, e) {
    // e.preventDefault();
    let response = await axios.put(
      `http://localhost:7000/api/updatecustomerstatus?status=active&email=${email}`
    );
    console.log(response);
  }

  async function deactivestatus(email, e) {
    let response = await axios.put(
      `http://localhost:7000/api/updatecustomerstatus?status=deactive&email=${email}`
    );
    console.log(response);
  }

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate();
  const goToAbout = ()=>{
    // alert("hi");
    navigate("/components/subcategory/addsubcategory");
  };


function user(){
  axios.get('http://localhost:7000/api/viewcustomer').then(
    (response)=>{
            setRows(response.data)
    }
  )
}

useEffect(()=>{
  user()
  },[])
  

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

   
{/* ///////////////////////// Edit Offer //////////////////////////// */}
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:'530px'}}>
        <div className='container' style={{paddingTop:'0px',borderRadius:'0px',width:'500px',marginLeft:'-25px', height:'530px', marginTop:'0px'}}>
     
        <form>

          <div className="row" style={{ display:'flex', justifyContent:'space-between', marginLeft:'0px'}}>
            <div className="column">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={newemail} onChange={(e)=>setNewemail(e.target.value)}  required/>
            </div>
            </div>
            <div className="row" style={{ display:'flex', justifyContent:'space-between', marginLeft:'0px'}}>
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="mobile_no">Mobile No</label>
              <input type="tel" id="mobile_no" name="mobile_no" value={newmobile_no} onChange={(e)=>setNewmobile_no(e.target.value)} disabled={true} required/>
            </div>
          </div>

          <div className="row" style={{ display:'flex', justifyContent:'space-between', marginLeft:'0px'}}>
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="password">Password</label>
              <input type="password"  id="password" name="password" value={newpassword} onChange={(e)=>setNewpassword(e.target.value)} required/>
            </div>
            
            <div className="column" style={{ width:'200px'}}>
            <label htmlFor="status"> Status </label>
              <input type="text"   id="status" name="status" value={newstatus} onChange={(e)=>setNewstatus(e.target.value)}  required/>
            </div>
          </div>
        
        </form>
        </div>
        </Modal.Body>
        <Modal.Footer>

<Button variant="secondary" onClick={handleClose}>

  Close

</Button>

<Button variant="primary" onClick={()=>saveUpdatedData()}>

  Save

</Button>

</Modal.Footer>
      </Modal>

    <div style={{width:'80%', marginLeft:'130px',marginTop:'0px',  height:'600px'}}>
    <Row style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form><h3 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>View Customer</b> </h3></Form></Col>
       </Row>
      <Row style={{ marginTop:'-20px', marginLeft:'0px'}}>
            <div style={{ display: "flex", marginTop: "0px", marginLeft: "778px", width: "295px", height: "40px"}}  >
              <span>
                <img
                  src={ADD}
                  style={{ marginLeft: "30px", marginTop: "5px" }}
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
                  marginLeft: "9px",
                  width: "200px",
                  height: "40px",
                  border: "1px solid #e3e1e1"
                }}
                id="myInput"
                placeholder="Search for id.."
                title="Type a id"
                onChange={(e) => {setSearchTerm(e.target.value)}}
              ></input>
            </div>
          </Row>

       <div  style={{height:'400px', marginTop:'-20px' }}>   
    <Card sx={{ minWidth: 300,p:2 , marginTop:'-10px'}}>
      <CardContent>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{maxHeight: 400,backgroundColor:'#e6ecf0'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h6><b>Email</b></h6></TableCell>
              <TableCell align="center"><h6><b>Mobile No.</b></h6></TableCell>
             
              <TableCell align="center"><h6><b>Registered On</b></h6></TableCell>
              <TableCell align="center"><h6><b>Status</b></h6></TableCell>
              <TableCell align="center"><h6><b>Actions</b></h6></TableCell>

              
              </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((row) => {
                if (searchTerm === ""){
                  return row;
                } else if (
                  row.email.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))||
                  row.mobile_no.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))
                ){
                  return row;
                }
              })
              .map((row) => {
                return (
                  <TableRow 
                  hover 
                  role="checkbox"
                   tabIndex={-1} 
                   key={row.email}
                   >
 <TableCell  align='center' style={{fontSize:'13px'}}>{row.email} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.mobile_no} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>
 <div
                                  style={{
                                    height: "50px",
                                    width: "130px",
                                    marginLeft: "90px",
                                    fontSize: '13px'
                                  }}
                                >
                                  {moment(row.registeredOn).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </div>{" "}
 </TableCell> 
 <TableCell
                                align="center"
                                style={{ fontSize: "13px" }}
                              >
                                {row.status === "deactive" ? (
                                  <Switch
                                    onChange={(e) => activestatus(row.email)}
                                  />
                                ) : (
                                  <Switch
                                    onClick={(e) => deactivestatus(row.email)}
                                    defaultChecked
                                  />
                                )}
                              </TableCell>

 <TableCell align='center'>
 <span><img src={EDIT} alt="addproduct" width="27px" height="27px" onClick={() => updateData(row.email, row.mobile_no, row.password, row.status)}/>{" "}</span>
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
  )
}

export default Customer
