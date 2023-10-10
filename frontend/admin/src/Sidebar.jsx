import './sidebar.css';
import React, { useState } from 'react';
import {  Link} from 'react-router-dom';
import DROP from "../src/components/images/drop.png";
 import items from "./sidebardata"
import {Layout, Menu} from 'antd';


const { Header,Footer, Sider, Content } = Layout;




const Sidebar = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
 
  return (
    <>
    <div>
<Layout
      style={{
        minHeight: '95vh',
        // backgroundColor:'green'
      }}
    >
  
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      
      {/* <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
      <Menu theme='dark' mode="inline" items={items}   style={{
        // width:"200px",
        // marginTop:"64px",
        // backgroundColor:'#fff',
        fontSize:'17px',
        color:'white',
        height: 'auto',
        marginTop: '50px'
      }}/> 
    </Sider>
      <Layout className="site-layout">
          <Header style={{backgroundColor: '#001529', height: "50px", color: '#fff'}}>
         <div className="column" style={{ display: "flex", width: "1286px" }}>
          <div className="rightpart" style={{ height: "56px", marginLeft:'685px', display: "flex", paddingLeft:'150px', marginTop:'-6px' }}>
          
      <div style={{display:'flex', paddingTop:'10px',marginTop:'10px', marginLeft:'100px', width:'350px', height:'40px'}}>
      <h3 style={{ marginTop: "-6px", marginLeft:'60px'}}>Welcome :</h3>
           <p style={{marginLeft:'10px', marginTop:'-20px'}}>jain@gmail.com</p>
        {/* <p>{user.email}</p> */}
        <div className ="dropdown">
              <img
                src={DROP}
                alt="Cinque Terre"
                width="13"
                height="13"
              />
              <div className="dropdown-content" style={{ color: "#fff" }}>
              <Link to="/" style={{ textDecoration:'none' ,color: "#fff" }}> <h6> Profile</h6></Link>
              <Link to="/" style={{ textDecoration:'none' ,color: "#fff" }}>  <h6> Change Password</h6></Link>
              <Link to="/" style={{ textDecoration:'none' ,color: "#fff" }}>  <h6> LogOut </h6></Link>          
              </div>
            </div>
      </div>

           
          </div>
        </div>
      </Header>
        <Content 
         className='con'>
  
  <div>
  
  {children}
  
         </div>

        </Content>
        <Footer
          style={{
          marginBottom:'-37px',
            textAlign: 'center',
            backgroundColor: '#001529',
            color: 'white',
            fontSize: '20px',
            height:"50px",
            paddingTop:'15px'
          }}
        >
          <span>Apna Bazaar ©2018 Created by Micro Technology</span>
        </Footer>
      </Layout>
     
    </Layout>
   
    </div>
    </>
  )
}

export default Sidebar