import React,{ useEffect,useState } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form,Row,Col} from 'react-bootstrap/';
import axios from 'axios';
import { Switch } from "antd";
import Sidebar from '../../Sidebar';
import {useNavigate} from 'react-router-dom';
import ADD from '../images/add.png';
import Update from './Update';


const ViewRetailer = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)

 
  async function activestatus(retailer_id, e) {
    // e.preventDefault();
    let response = await axios.put(
      `http://localhost:7000/api/updateretailerstatus?status=Active&retailer_id=${retailer_id}`
    );
    console.log(response);
  }

  async function inactivestatus(retailer_id, e) {
    let response = await axios.put(
      `http://localhost:7000/api/updateretailerstatus?status=Inactive&retailer_id=${retailer_id}`
    );
    console.log(response);
  }


  const navigate = useNavigate();
  const goToAbout = ()=>{
    // alert("hi");
    navigate("/components/retailer/addRetailer");
  };


function user(){
  axios.get('http://localhost:7000/api/viewretailer').then(
    (response)=>{
            setRows(response.data)
    }
  )
}


useEffect(()=> {
  user()
}, [])


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
 <div style={{width:'80%', marginLeft:'130px',marginTop:'0px',  height:'600px'}}>
    <Row style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form><h3 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>View Retailer</b> </h3></Form></Col>
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
              <TableCell align="center"><h6><b>Retailer Id</b></h6></TableCell>
              <TableCell align="center"><h6><b>Shop Name</b></h6></TableCell>
              {/* <TableCell align="center"><h6><b>Password</b></h6></TableCell> */}
              <TableCell align="center"><h6><b>Owner Name</b></h6></TableCell>
              <TableCell align="center"><h6><b>Registration No</b></h6></TableCell>
              <TableCell align="center"><h6><b>Registration Document</b></h6></TableCell>
              <TableCell align="center"><h6><b>Profile Photo</b></h6></TableCell>      
              <TableCell align="center"><h6><b>GST No.</b></h6></TableCell>
              <TableCell align="center"><h6><b>Pan No.</b></h6></TableCell>
              <TableCell align="center"><h6><b>Address</b></h6></TableCell>
              <TableCell align="center"><h6><b>State</b></h6></TableCell>
              <TableCell align="center"><h6><b>City</b></h6></TableCell>
              <TableCell align="center"><h6><b>PinCode</b></h6></TableCell>
              <TableCell align="center"><h6><b>Contact No.</b></h6></TableCell>
              <TableCell align="center"><h6><b>Email</b></h6></TableCell>
              <TableCell align="center"><h6><b>Registration On</b></h6></TableCell>
              <TableCell align="center"><h6><b>Status</b></h6></TableCell>   
              <TableCell align="center"><h6><b>Action</b></h6></TableCell>              
              </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow 
                  hover 
                  role="checkbox"
                   tabIndex={-1} 
                   key={row.retailer_id}
                   >
 <TableCell align='center' style={{fontSize:'13px'}}>{row.retailer_id} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.shop_name} </TableCell>
 {/* <TableCell align='center' style={{fontSize:'13px'}}>{row.password} </TableCell> */}
 <TableCell align='center' style={{fontSize:'13px'}}>{row.owner_name} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.registration_no} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{<img src={row.registration_document} alt='img1' height='50px' width='70px'/>}</TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{<img src={row.profile_photo} alt='img1' height='50px' width='70px'/>}</TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.gst_no} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.pan_no} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.address} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.state} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.city} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.pincode} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.contact_no} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.email} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.registration} </TableCell> 
 <TableCell
                                align="center"
                                style={{ fontSize: "13px" }}
                              >
                                {row.status === "Inactive" ? (
                                  <Switch
                                    onChange={(e) => activestatus(row.retailer_id)}
                                  />
                                ) : (
                                  <Switch
                                    onClick={(e) => inactivestatus(row.retailer_id)}
                                    defaultChecked
                                  />
                                )}
                              </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{<Update ownerid={row.retailer_id} shopname={row.shop_name} password={row.password} ownername={row.owner_name} registrationno={row.registration_no} gst={row.gst_no} pan={row.pan_no} address={row.address} state={row.state} city={row.city} pincode={row.pincode} contact={row.contact_no} email={row.email} registration={row.registration} status={row.status}/>}</TableCell> 

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

export default ViewRetailer