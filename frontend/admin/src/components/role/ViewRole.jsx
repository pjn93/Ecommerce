import React,{ useEffect,useState } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form,Row,Col,Modal, Button} from 'react-bootstrap/';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import UPDATE from '../images/edit.png';
import Sidebar from '../../Sidebar';
import ADD from '../images/add.png'


const ViewRole = () => {

  const [newrole_id, setNewrole_id] = useState("")
  const [newroleName, setNewroleName] = useState("")
 

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchTerm, setSearchTerm] = useState("")


 
  async function updateData(role_id, roleName){
    console.log(role_id, roleName)
    setNewrole_id(role_id);
    setNewroleName(roleName);
    handleShow()
  }



 async function saveUpdatedData(){
    let response = await axios.put(`http://localhost:7000/api/updaterole/${newrole_id}`, {
      "roleName": newroleName,
      })
      console.log(response)
  }






function user(){
  axios.get('http://localhost:7000/api/getrole').then(
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
  {/* ///////////////////////// Edit Role //////////////////////////// */}
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButrton>
          <Modal.Title>Update Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:'530px'}}>
        <div className='container' style={{paddingTop:'0px',borderRadius:'0px',width:'500px',marginLeft:'-25px', height:'530px', marginTop:'0px'}}>
     
        <form>

          <div className="row">
            <div className="column">
              <label htmlFor="user_id">User Id <span style={{ color: "white" }}>*</span></label>
              <input type="text"   id="role_id" name="user_id" value={newrole_id} onChange={(e)=>setNewrole_id(e.target.value)} disabled='true' required/>
            </div>
            
            <div className="column">
              <label htmlFor="name">Name</label>
              <input type="text" id="roleName" name="roleName" value={newroleName} onChange={(e)=>setNewroleName(e.target.value)} required/>
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


   <div style={{width:'80%', marginLeft:'130px', marginTop:'0px', height:'600px'}}>
    <Row  style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form ><h3 style={{textAlign:'center', color:'#002140',   marginTop: "-20px",}}><b>View Roles</b> </h3></Form></Col>
       </Row>
       <div
              style={{
                marginTop: "-30px",
                marginLeft: "790px",
                width: "280px",
                height: "40px"
              }}
            >
              {/* <span> */}
                {/* <img
                  src={ADD}
                  style={{ marginLeft: "20px", marginTop: "5px" }}
                  alt="addproduct"
                  width="40px"
                  height="35px"
                  onClick={goToAbout}
                />
              </span> */}

              <input
                type="text"
                style={{
                  marginTop: "0px",
                  marginLeft: "80px",
                  width: "200px",
                  height: "40px",
                  border: "1px solid #e3e1e1"
                }}
                id="myInput"
                placeholder="Search Roles.."
                title="Type id"
                onChange={(e) => {setSearchTerm(e.target.value)}}
              ></input>
            </div>
       <div style={{height:'400px' ,marginTop:'-10px' }}>
    <Card sx={{ minWidth: 300,p:2 , marginTop:'10px'}}>
      <CardContent>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{maxHeight: 400,backgroundColor:'#e6ecf0'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h6><b>Role Id</b></h6></TableCell>
              <TableCell align="center"><h6><b>Role name</b></h6></TableCell>
              <TableCell align="center"><h6><b>Action</b></h6></TableCell>
              
              </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .filter((row) => {
                if (searchTerm === ""){
                  return row;
                } else if (
                  row.role_id.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))||
                  row.roleName.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))
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
                   key={row.role_id}
                   >
 <TableCell  align='center' style={{fontSize:'13px'}}>{row.role_id} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.roleName} </TableCell>
 <TableCell align='center'>  <span><img src={UPDATE} alt="addproduct" width="27px" height="27px" onClick={()=>updateData(row.role_id, row.roleName)}/></span> 
 
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

export default ViewRole
