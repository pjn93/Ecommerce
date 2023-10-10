import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Sidebar from '../Sidebar'
import PRODUCT from './images/product.png';
import SHOP from './images/shop.png';
import CUSTOMER from './images/customer.png';
import USER from './images/users.png'
import axios from 'axios';
import "./Dashboard.css";


export const data = [
  [
    { type: "number", label: "x" },
    { type: "number", label: "values" },
    { id: "i0", type: "number", role: "interval" },
    { id: "i1", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
    { id: "i2", type: "number", role: "interval" },
  ],
  [1, 100, 90, 110, 85, 96, 104, 120],
  [2, 120, 95, 130, 90, 113, 124, 140],
  [3, 130, 105, 140, 100, 117, 133, 139],
  [4, 90, 85, 95, 85, 88, 92, 95],
  [5, 70, 74, 63, 67, 69, 70, 72],
  [6, 30, 39, 22, 21, 28, 34, 40],
  [7, 80, 77, 83, 70, 77, 85, 90],
  [8, 100, 90, 110, 85, 95, 102, 110],
];

export const options = {
  title: "Total Revenue",
  titleTextStyle: {fontSize: '20'},
  series: [{ color: "#1A8763" }],
  intervals: { lineWidth: 1, barWidth: 1, style: "boxes" },
  legend: "none",
};


export const data1 = [
  ["Department", "Revenues Change"],
  ["Shoes", { v: 12, f: "12.0%" }],
  ["Sports", { v: -7.3, f: "-7.3%" }],
  ["Toys", { v: 0, f: "0%" }],
  ["Electronics", { v: -2.1, f: "-2.1%" }],
  ["Food", { v: 22, f: "22.0%" }],
];

export const options1 = {
  allowHtml: true,
  showRowNumber: true,
  height:'400px',
  width: '500px'
};

export const data3 = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options3 = {
  // title: "My Daily Activities",
  is3D: true,
  legend: 'none'
};

// export const formatters = [
//   {
//     type: "ArrowFormat" as const,
//     column: 1,
//   },
// ];

function Dashboard() {
  const [totalShop, setTotalShop] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState([]);
  const [totalCategory, setTotalCategory] = useState([]);
  const [totalSubCategory, setTotalSubCategory] = useState([]);
const [totalShops1, setTotalShops1] = useState([]);

  
useEffect(()=>{
  async function viewTotalShops(){
  let response = await axios.get('http://localhost:7000/api/viewtotalshops')
  console.log(response.data)
  setTotalShop(response.data)
  }
viewTotalShops()
}, [])


useEffect(()=>{
  async function viewTotalUsers(){
  let response = await axios.get('http://localhost:7000/api/viewtotalusers')
  console.log(response.data)
  setTotalUsers(response.data)
  }
viewTotalUsers()
}, [])

useEffect(()=>{
  async function viewTotalCustomers(){
  let response = await axios.get('http://localhost:7000/api/viewtotalcustomer')
  console.log(response.data)
  setTotalCustomer(response.data)
  }
viewTotalCustomers()
}, [])

useEffect(()=>{
  async function viewTotalCategory(){
  let response = await axios.get('http://localhost:7000/api/viewtotalcategory')
  console.log(response.data)
  setTotalCategory(response.data)
  }
viewTotalCategory()
}, [])

useEffect(()=>{
  async function viewTotalSubCategory(){
  let response = await axios.get('http://localhost:7000/api/viewtotalsubcategory')
  console.log(response.data)
  setTotalSubCategory(response.data)
  }
viewTotalSubCategory()
}, [])


useEffect(()=>{
  async function viewShops(){
  let response = await axios.get('http://localhost:7000/api/viewtotalstatus')
  console.log(response.data)
  setTotalShops1(response.data)
  }
viewShops()
}, [])

  return (
    <>
    <Sidebar>
    <div
      style={{
        width: '90%',
        height: "590px",
        marginTop: "30px",
        marginLeft: "70px",
        // backgroundColor: '#ced6d0',
        paddingTop: '20px'
      }}
    >
      <div
        className="subdash"
        style={{
          marginTop: "-20px",
          marginLeft: "0px",
          width:'100%',
          height:'135px',
          display: "flex",
          justifyContent: "space-between",
          // backgroundColor:'yellow'
        }}
      >

      <Card className="cardstyle" style={{ width: "16rem", height:'120px'}}>
        <div style={{display:'flex', marginTop:'20px',justifyContent:'space-around'}}>
          
            <div style={{paddingTop:'25px'}}>
              {" "}
              <Card.Img
                variant="top"
                src={USER}
                style={{ width: "40px" }}
              />
            </div>
            <div>
            <Card.Body>
              <Card.Title style={{ color: "#002140" }}>
                <h5><b>Total User</b></h5>
              </Card.Title>
              <Card.Text>
              {
                totalUsers.map((item1, index1) => {
                  return(
                    <h5 style={{color:'#002140'}}>{item1.totalUsers}</h5>
                  )
                })
              }
              </Card.Text>
            </Card.Body>
            </div>
         
        </div>
        </Card>

      
        <Card className="cardstyle" style={{ width: "16rem", height:'120px' }}>
        <div style={{display:'flex', marginTop:'20px',justifyContent:'space-around',  height:'125px'}}>

        <div style={{ paddingTop:'25px'}}>
           {" "}
            <Card.Img
                variant="top"
                src={SHOP}
                style={{ width: "40px" }}
              />
            </div>

            <div>
            <Card.Body>
              <Card.Title style={{ color: "#002140" }}>
              <h5><b>Total Shop</b></h5>
              </Card.Title>
              <Card.Text>  
               
               <div style={{display:'flex', justifyContent:'space-between'}}>
                <div> {
                totalShop.map((item, index) => {
                  return(
                    <h5 style={{color:'#002140'}}>{item.totalShops}</h5>
                  )
                })
              }
            </div>
                <div> {
                totalShops1.map((item4, index) => {
                  return(
                    <>
                    <div style={{display:'flex', width:'70px', justifyContent:'space-between', height:'20px'}}>
                    <div><p style={{color:'#002140'}}>{item4.status}</p></div>
                    <div> <p style={{color:'#002140'}}>{item4.total_shop}</p></div>
                    </div> 
                    </>
                  )
                })
              }        </div>
               </div>
             
              
              </Card.Text>
            </Card.Body>
            </div>
        </div>
        </Card>

        <Card className="cardstyle" style={{ width: "16rem", height:'120px'}}>
        <div style={{display:'flex', marginTop:'20px',justifyContent:'space-around'}}>
        <div style={{ paddingTop:'25px'}}>
              {" "}
              <Card.Img
                variant="top"
                src={CUSTOMER}
                style={{ width: "40px" }}
              />
            </div>
            <div>
            <Card.Body>
                <Card.Title style={{ color: "#002140" }}>
                 <h5><b>Total Customer</b></h5>
                </Card.Title>
                <Card.Text>
                {
                totalCustomer.map((item3, index3) => {
                  return(
                    <h5 style={{color:'#002140'}}>{item3.totalCustomer}</h5>
                  )
                })
              }
                </Card.Text>
                </Card.Body>
              </div>
             </div>
             </Card>


       
        <Card className="cardstyle" style={{ width: "16rem", height:'120px'}}>
        <div style={{display:'flex', marginTop:'20px',justifyContent:'space-around'}}>
        <div style={{paddingTop:'25px'}}>
              {" "}
              <Card.Img
                variant="top"
                src={PRODUCT}
                style={{ width: "40px" }}
              />
            </div>
            <div>
            <Card.Body>
                <Card.Title style={{ color: "#002140" }}>
                
               <h5><b>Total category</b></h5> 
                   </Card.Title>
                <Card.Text>
                <div style={{display:'flex', height: '50px',justifyContent:'space-between'}}>
                  <div>
                  {
                totalCategory.map((item4, index4) => {
                  return(
                    <h5 style={{color:'#002140'}}>{item4.totalCategory}</h5>
                  )
                })
              }
                  </div>
                  <div>
                  <div>
                   {
                totalCategory.map((item4, index4) => {
                  return(
                    <p style={{color:'#002140'}}>Category : {item4.totalCategory}</p>
                  )
                })
              }
              </div>
               <div style={{ marginTop:'-12px'}}>
           {
                totalSubCategory.map((item4, index4) => {
                  return(
                    <p style={{color:'#002140'}}>SubCategory : {item4.totalSubCategory}</p>
                  )
                })
              }
                  </div>
                  </div>
                </div>
                
                </Card.Text>
            </Card.Body>
            </div>
            </div>
          </Card>
</div>

      <div
        style={{
          display: "flex",
          height:'410px',
          width: "100%",
          marginLeft: "0px",
          marginTop: "30px",
          justifyContent: 'space-between',
          // backgroundColor: 'green',
          // border:'5px solid #d1cfcf'
        }}
      >
       <div className="chartstyle"  style={{ height:'410px',width:'400px', border:'1px solid #d1cfcf'}}>
       <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
     <div style={{display:'flex', width:'160px',  justifyContent:'space-between', marginLeft:'10px'}}>
    <div><label style={{color:'black'}}>Month</label></div>
    <div style={{ height:'35px'}}> <select style={{height:'35px', marginTop:'0px'}}>
    <option value="volvo">January</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select></div>

  </div>
  <div style={{display:'flex', width:'150px',justifyContent:'space-evenly'}}>
    <div style={{marginLeft: '20px'}}><label style={{color:'black'}}>Year</label></div>
    <div style={{ height:'35px', marginLeft:'10px'}}> 
    <select style={{height:'35px', marginTop:'0px'}}>
    <option value="volvo">2022</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select></div>

  </div>
  </div>
      <Chart 
      chartType="LineChart"
      width="100%"
      height="374px"
      data={data}
      options={options}
    /></div>

       <div className="chartstyle" style={{width:'440px', border:'1px solid #d1cfcf'}}> 
       <Chart 
      chartType="Table"
      width={"100%"}
      height={"400px"}
      data={data1}
      options={options1}
      // formatters={formatters}
    /></div>
       <div className="chartstyle" style={{ width:'300px', border:'1px solid #d1cfcf'}}>  <Chart
      chartType="PieChart"
      data={data3}
      options={options3}
      width={"100%"}
      height={"400px"}
    /></div>

      </div>
    </div>
    </Sidebar>

    </>
  );
}

export default Dashboard;
