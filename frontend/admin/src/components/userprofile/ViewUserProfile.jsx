import React,{ useEffect,useState } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form,Row,Col} from 'react-bootstrap/';
import axios from 'axios';
import Sidebar from '../../Sidebar';
import {useNavigate} from 'react-router-dom';
import UPDATE from '../images/edit.png';
import DELETE from '../images/trash.png';
import ADD from '../images/add.png'



const ViewUserProfile = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)

 
  const navigate = useNavigate();
  const goToAbout = ()=>{
    // alert("hi");
    navigate("/components/user/AddUser");
  };

  async function deleteCustomer(user_id){

    let response = await axios.delete(`http://localhost:7000/api/delUser/${user_id}`)
   console.log(response);
   user()
  }

useEffect(()=>{
user()
},[])

function user(){
  axios.get('http://localhost:7000/api/viewuserprofile').then(
    (response)=>{
            setRows(response.data)
    }
  )
}

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
   <div style={{width:'90%', marginLeft:'70px',marginTop:'-20px'}}>
    <Row>
      <Col><Form style={{padding:'5px'}}><h1 style={{textAlign:'center', color:'#002140'}}><b>UserProfile Details</b> </h1></Form></Col>
       </Row>
       <Row>
      <span><img src={ADD} style={{marginLeft:'1060px',marginTop:'-20px'}} alt="addproduct" width="40px" height="35px" onClick={goToAbout}/></span> 
       
<input type="text" style={{marginTop:'-25px'}} id="myInput"  placeholder="Search for id.." title="Type a id"></input>
       </Row>
    <Card sx={{ minWidth: 500,p:2 , marginTop:'10px'}}>
      <CardContent>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{maxHeight: 1000,backgroundColor:'#e6ecf0'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h4><b>User Id</b></h4></TableCell>
              <TableCell align="center"><h4><b>Mobile No</b></h4></TableCell>
              <TableCell align="center"><h4><b>Email</b></h4></TableCell>
              <TableCell align="center"><h4><b>Profile Photo</b></h4></TableCell>
              <TableCell align="center"><h4><b>AdhaarCard No</b></h4></TableCell>
              <TableCell align="center"><h4><b>Address</b></h4></TableCell>
              <TableCell align="center"><h4><b>State</b></h4></TableCell>
              <TableCell align="center"><h4><b>City</b></h4></TableCell>
              <TableCell align="center"><h4><b>PinCode</b></h4></TableCell>
              <TableCell align="center"><h4><b>Action</b></h4></TableCell>
              
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
                   key={row.user_id}
                   >
 <TableCell  align='center' style={{fontSize:'15px'}}>{row.user_id} </TableCell>
 <TableCell align='center' style={{fontSize:'15px'}}>{row.mobile_no} </TableCell>
 <TableCell align='center' style={{fontSize:'15px'}}>{row.email} </TableCell>
 <TableCell align='center' style={{fontSize:'15px'}}>{row.profile_photo} </TableCell> 
 <TableCell align='center' style={{fontSize:'15px'}}>{row.adhar} </TableCell> 
 <TableCell align='center' style={{fontSize:'15px'}}>{row.address} </TableCell> 
 <TableCell align='center' style={{fontSize:'15px'}}>{row.state} </TableCell> 
 <TableCell align='center' style={{fontSize:'15px'}}>{row.city} </TableCell> 
 <TableCell align='center' style={{fontSize:'15px'}}>{row.pincode} </TableCell> 

 <TableCell align='center'> <span><img src={UPDATE} alt="addproduct" width="30px" height="30px"/></span> 
 <span><img src={DELETE} alt="addproduct" width="30px" height="30px"  onClick={()=>{if(window.confirm('Are you sure you want to delete it'))deleteCustomer(row.user_id)}}/>{" "}</span>

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
    </Sidebar>
    </>
  )
}

export default ViewUserProfile