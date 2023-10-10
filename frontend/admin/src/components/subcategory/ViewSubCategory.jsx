import React,{ useEffect,useState } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form, Row, Col, Modal, Button} from 'react-bootstrap/';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Sidebar from '../../Sidebar';
import UPDATE from '../images/edit.png';
import ADD from '../images/add.png'



const ViewSubCategory = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [newcategory_id, setNewcategory_id] = useState("")
  const [newsubcategory_id, setNewsubcategory_id] = useState("")
  const [newsubcategory_name, setNewsubcategory_name] = useState("")
  const [newsubcategory_image, setNewsubcategory_image] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleImage = (e) => {
    setNewsubcategory_image(e.target.files[0])
  }

 
  const navigate = useNavigate();
  const goToAbout = ()=>{
    // alert("hi");
    navigate("/components/subcategory/addsubcategory");
  };




function user(){
  axios.get('http://localhost:7000/api/viewsubcategory').then(
    (response)=>{
            setRows(response.data)
    }
  )
}

useEffect(()=>{
  user()
  },[])

async function updateData(category_id, subCategory_id, subCategory_name){
  console.log(category_id,  subCategory_id, subCategory_name)
  setNewcategory_id(category_id);
  setNewsubcategory_id(subCategory_id);
  setNewsubcategory_name(subCategory_name);
  handleShow()
}



async function saveUpdatedData(e){
  e.preventDefault();
  const formData = new FormData();
  formData.append("category_id", newcategory_id);
  formData.append("subCategory_name", newsubcategory_name);
  formData.append("subCategory_image", newsubcategory_image);
  const configs = {
    "content-Type": "multiple/form-data"
  };

  let response = await axios.put(`http://localhost:7000/api/updatesubcategory/${newsubcategory_id}`, formData, configs)
  
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
          <Modal.Title>Update SubCategory</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:'530px'}}>
        <div className='container' style={{paddingTop:'0px',borderRadius:'0px',width:'500px',marginLeft:'-25px', height:'530px', marginTop:'0px'}}>
     
        <form>

          <div className="row">
            <div className="column">
              <label htmlFor="subCategory_id">SubCategory Id <span style={{ color: "white" }}>*</span></label>
              <input type="text"   id="subCategory_id" name="subCategory_id" value={newsubcategory_id} onChange={(e)=>setNewsubcategory_id(e.target.value)} disabled={true} required/>
            </div>
            <div className="column">
              <label htmlFor="category_id">Category Id</label>
              <input type="text" id="category_id" name="category_id" value={newcategory_id} onChange={(e)=>setNewcategory_id(e.target.value)} />
            </div>
          </div>
          <div className="row">
          <div className="column">
              <label htmlFor="subCategory_name">Name</label>
              <input type="text" id="subCategory_name" name="subCategory_name" value={newsubcategory_name} onChange={(e)=>setNewsubcategory_name(e.target.value)} />
            </div>
            <div className="column">
              <label htmlFor="subCategory_image">Category Image <span style={{ color: "white" }}>*</span></label>
              <input type="file" id="subCategory_image" name="subCategory_image" onChange={handleImage} />
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

   <div style={{width:'80%', marginLeft:'130px', marginTop:'0px', height:'600px'}}>
   <Row style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form><h3 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>View SubCategory</b> </h3></Form></Col>
       </Row>
          <Row style={{ height:'40px', marginTop:'-20px', marginLeft:'0px'}}>
            <div style={{ display: "flex", marginTop: "0px", marginLeft: "774px", width: "295px", height: "40px"}}  >
              <span>
                <img
                  src={ADD}
                  style={{ marginLeft: "34px", marginTop: "5px" }}
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
                  marginLeft: "10px",
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
        


       <div style={{height:'400px', marginTop:'-19px'}}>
    <Card sx={{ minWidth: 300,p:2 , marginTop:'-10px'}}>
      <CardContent>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{maxHeight: 400,backgroundColor:'#e6ecf0'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h6><b>Category Id</b></h6></TableCell>
              <TableCell align="center"><h6><b>SubCategory Id</b></h6></TableCell>
              <TableCell align="center"><h6><b>SubCategory Name</b></h6></TableCell>
              <TableCell align="center"><h6><b>SubCategory Image</b></h6></TableCell>
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
                  row.subCategory_id.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))||
                  row.subCategory_name.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))
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
                   key={row.subCategory_id}
                   >
 <TableCell  align='center' style={{fontSize:'13px'}}>{row.category_id} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.subCategory_id} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.subCategory_name} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{<img src={row.subCategory_image} alt='img1' height='50px' width='70px'/>}</TableCell>

 <TableCell align='center'>
 
 <span><img src={UPDATE} alt="addproduct" width="27px" height="30px" onClick={() => updateData(row.category_id, row.subCategory_id, row.subCategory_name)}/>{" "}</span>
 
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

export default ViewSubCategory
