import React,{ useEffect,useState } from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Card, CardContent} from '@mui/material/';
import {Form,Row,Col,Modal, Button} from 'react-bootstrap/';
import axios from 'axios';
import { Switch } from "antd";
import Sidebar from '../../Sidebar';
import {useNavigate} from 'react-router-dom';
import UPDATE from '../images/edit.png';
import ADD from '../images/add.png'



const ViewCategory = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newoffer_code, setNewoffer_code] = useState("")
  const [newoffer_name, setNewoffer_name] = useState("")
  const [newvalid_from, setNewvalid_from] = useState("")
  const [newvalid_upto, setNewvalid_upto] = useState("")
  const [newdiscount_percentage, setNewdiscount_percentage] = useState("")
  const [newflat_discount, setNewflat_discount] = useState("")
  const [newstatus, setNewstatus] = useState("")


  async function updateData(offer_code, offer_name, valid_from, valid_upto, discount_percentage, flat_discount, status){
    console.log(offer_code, offer_name, valid_from, valid_upto, discount_percentage, flat_discount, status)
    setNewoffer_code(offer_code);
    setNewoffer_name(offer_name);
    setNewvalid_from(valid_from);
    setNewvalid_upto(valid_upto);
    setNewdiscount_percentage(discount_percentage);
    setNewflat_discount(flat_discount);
    setNewstatus(status);
    handleShow()
  }

 async function saveUpdatedData(){
    let response = await axios.put(`http://localhost:7000/api/updateoffer/${newoffer_code}`, {
      offer_name: newoffer_name,
      valid_from: newvalid_from,
      valid_upto: newvalid_upto,
      discount_percentage: newdiscount_percentage,
      flat_discount: newflat_discount,
      status: newstatus
      })
      console.log(response)
  }

  async function activestatus(offer_code, e) {
    // e.preventDefault();
    let response = await axios.put(
      `http://localhost:7000/api/updateofferstatus?status=active&offer_code=${offer_code}`
    );
    console.log(response);
  }

  async function inactivestatus(offer_code, e) {
    let response = await axios.put(
      `http://localhost:7000/api/updateofferstatus?status=inactive&offer_code=${offer_code}`
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
    navigate("/components/offer/addoffer");
  };

function user(){
  axios.get('http://localhost:7000/api/viewoffer').then(
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
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="offer_code"> Offer Code<span style={{ color: "white" }}>*</span></label>
              <input type="text"   id="offer_code" name="offer_code" value={newoffer_code} onChange={(e)=>setNewoffer_code(e.target.value)} disabled={true} required/>
            </div>
            
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="offer_name">Offer Name</label>
              <input type="text" id="offer_name" name="offer_name" value={newoffer_name} onChange={(e)=>setNewoffer_name(e.target.value)} required/>
            </div>
          </div>

          <div className="row" style={{ display:'flex', justifyContent:'space-between', marginLeft:'0px'}}>
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="valid_from">Valid From</label>
              <input type="date"   id="valid_from" name="valid_from" value={newvalid_from} onChange={(e)=>setNewvalid_from(e.target.value)} required/>
            </div>
            
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="valid_upto">Valid Upto</label>
              <input type="date" id="valid_upto" name="valid_upto" value={newvalid_upto} onChange={(e)=>setNewvalid_upto(e.target.value)} required/>
            </div>
          </div>

          <div className="row" style={{display:'flex', justifyContent:'space-between', marginLeft:'0px'}}>
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="discount_percentage">DiscountPercentage</label>
              <input type="number"   id="discount_percentage" name="discount_percentage" value={newdiscount_percentage} onChange={(e)=>setNewdiscount_percentage(e.target.value)} required/>
            </div>
            
            <div className="column" style={{ width:'200px'}}>
              <label htmlFor="flat_discount">Flat Discount</label>
              <input type="number" id="flat_discount" name="flat_discount" value={newflat_discount} onChange={(e)=>setNewflat_discount(e.target.value)} required/>
            </div>
          </div>

          <div className="row" style={{ marginLeft:'0px'}}>
            <div className="column">
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
      <Col><Form><h3 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>View Offer</b> </h3></Form></Col>
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
              <TableCell align="center"><h6><b>Offer Code</b></h6></TableCell>
              <TableCell align="center"><h6><b>Offer Name</b></h6></TableCell>
              <TableCell align="center"><h6><b>Valid From</b></h6></TableCell>
              <TableCell align="center"><h6><b>Valid Upto</b></h6></TableCell>
              <TableCell align="center"><h6><b>Discount Percentage</b></h6></TableCell>
              <TableCell align="center"><h6><b>Flat Discount</b></h6></TableCell>
              <TableCell align="center"><h6><b>Status</b></h6></TableCell>

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
                  row.offer_name.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))
                 
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
                   key={row.offer_code}
                   >
 <TableCell  align='center' style={{fontSize:'13px'}}>{row.offer_code} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.offer_name} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.valid_from} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.valid_upto} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.discount_percentage} </TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.flat_discount} </TableCell> 
 <TableCell
                                align="center"
                                style={{ fontSize: "13px" }}
                              >
                                {row.status === "inactive" ? (
                                  <Switch
                                    onChange={(e) => activestatus(row.offer_code)}
                                  />
                                ) : (
                                  <Switch
                                    onClick={(e) => inactivestatus(row.offer_code)}
                                    defaultChecked
                                  />
                                )}
                              </TableCell>

 <TableCell align='center'>  <span><img src={UPDATE} alt="addproduct" width="27px" height="27px" onClick={() => updateData(row.offer_code, row.offer_name, row.valid_from, row.valid_upto, row.discount_percentage, row.flat_discount, row.status)}/></span>
 
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