import React,{ useEffect,useState } from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Card, CardContent} from '@mui/material/';
import {Form, Row, Col, Modal, Button} from 'react-bootstrap/';
import Sidebar from '../../Sidebar';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import UPDATE from '../images/edit.png';
import ADD from '../images/add.png'



const ViewCategory = () => {

  const [newcategory_id, setNewcategory_id] = useState("")
  const [newcategory_name, setNewcategory_name] = useState("")
  const [newcategory_image, setNewcategory_image] = useState("")
  const [newgst, setNewgst] = useState("")
  const handleImage = (e) => {
    setNewcategory_image(e.target.files[0])
  }


  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


 
  const navigate = useNavigate();
  const goToAbout = ()=>{
    // alert("hi");
    navigate("/components/category/addcategory");
  };

function user(){
  axios.get('http://localhost:7000/api/viewcategory').then(
    (response)=>{
            setRows(response.data)
    }
  )
}

useEffect(()=>{
  user()
  },[])



  async function updateData(category_id, category_name, gst){
    console.log(category_id, category_name, gst)
    setNewcategory_id(category_id);
    setNewcategory_name(category_name);
    // setNewcategory_image(category_image);
    setNewgst(gst);
    handleShow()
  }
  


 async function saveUpdatedData(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", newcategory_name);
    formData.append("category_image", newcategory_image);
    formData.append("gst", newgst);
    const configs = {
      "content-Type": "multiple/form-data"
    };

    let response = await axios.put(`http://localhost:7000/api/updatecategory/${newcategory_id}`, formData, configs)
    
      console.log("response", response)
      console.log("formdata", formData)
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
    
    {/* /////////////////// Update Category ////////////////////*/}


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:'530px'}}>
        <div className='container' style={{paddingTop:'0px',borderRadius:'0px',width:'500px',marginLeft:'-25px', height:'530px', marginTop:'0px'}}>
     
        <form>

          <div className="row">
            <div className="column">
              <label htmlFor="category_id">Category Id <span style={{ color: "white" }}>*</span></label>
              <input type="text"   id="category_id" name="category_id" value={newcategory_id} onChange={(e)=>setNewcategory_id(e.target.value)} disabled={true} required/>
            </div>
            <div className="column">
              <label htmlFor="category_name">Name</label>
              <input type="text" id="category_name" name="category_name" value={newcategory_name} onChange={(e)=>setNewcategory_name(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="category_image">Category Image <span style={{ color: "white" }}>*</span></label>
              <input type="file" id="category_image" name="category_image" onChange={handleImage} />
            </div>
            <div className="column">
              <label htmlFor="gst">GST</label>
              <input type="text" placeholder="gst" id="gst" name="gst" value={newgst} onChange={(e)=>setNewgst(e.target.value)} required/>
            </div>
          </div>
        
        </form>
        </div>
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


     {/* //////////////////////////////////////////////////////// */}

   <div style={{width:'80%', marginLeft:'130px',marginTop:'0px',  height:'600px'}}>
    <Row style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form><h3 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>Category's List</b> </h3></Form></Col>
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

              <input type="text"
                style={{
                  marginTop: "0px",
                  marginLeft: "9px",
                  width: "200px",
                  height: "40px",
                  border: "1px solid #e3e1e1"
                }}
                id="myInput"
                placeholder="Search...."
                title="Type a id"
                 onChange={(e) => {setSearchTerm(e.target.value)}}
              />
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
              <TableCell align="center"><h6><b>Category Id</b></h6></TableCell>
              <TableCell align="center"><h6><b>Category Name</b></h6></TableCell>
              <TableCell align="center"><h6><b>Category Image</b></h6></TableCell>
              <TableCell align="center"><h6><b>Gst</b></h6></TableCell>
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
                  row.category_id.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))||
                  row.category_name.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))
                ){
                  return row;
                }
              }).map((row) => {
                return (
                  <TableRow 
                  hover 
                  role="checkbox"
                   tabIndex={-1} 
                   key={row.category_id}
                   >
 <TableCell  align='center' style={{fontSize:'13px'}}>{row.category_id} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.category_name} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{<img src={row.category_image} alt='img1' height='50px' width='70px'/>}</TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.gst} </TableCell> 
 <TableCell align='center'> 
 <span><img src={UPDATE} alt="addproduct" width="27px" height="30px" onClick={() => updateData(row.category_id, row.category_name, row.gst)}/>{" "}</span>

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

export default ViewCategory