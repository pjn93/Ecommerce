import React from 'react';
import Dashboard from './components/Dashboard';
import AddOffer from './components/offer/AddOffer';
import ViewOffer from './components/offer/ViewOffer';
import ViewCategory from './components/category/ViewCategory';
import AddCategory from './components/category/AddCategory';
import ViewSubCategory from './components/subcategory/ViewSubCategory'
import AddSubCategory from './components/subcategory/AddSubCategory';
import Customer from './components/Customer';
import ViewRetailer from './components/retailer/ViewRetailer';
import AddRetailer from './components/retailer/AddRetailer';
import ViewRole from './components/role/ViewRole';
import AddRole from './components/role/AddRole';
import ViewUser from './components/user/ViewUser';
import AddUser from './components/user/AddUser';
import{ Routes, Route} from 'react-router-dom';
import ViewProfile from './components/user/ViewProfile';


const Content = () => {
  return (
    <div>
              <Content 
         className='con'>
          <div>
  
   <Routes>
        <Route path='/' element={<Dashboard/>}/>
    
        <Route path='/components/offer/addoffer' element={<AddOffer/>}/>
        <Route path='/components/offer/viewoffer' element={<ViewOffer/>}/>
        <Route path='/components/category/addcategory' element={<AddCategory/>}/>
        <Route path='/components/category/viewcategory' element={<ViewCategory/>}/>
        <Route path='/components/subcategory/viewsubcategory' element={<ViewSubCategory/>}/>
        <Route path='/components/subcategory/addsubcategory' element={<AddSubCategory/>}/>
        <Route path='/components/role/addrole' element={<AddRole/>}/>
        <Route path='/components/role/viewrole' element={<ViewRole/>}/>
        <Route path='/components/user/viewuser' element={<ViewUser/>}/>
        <Route path='/components/user/adduser' element={<AddUser/>}/>
        <Route path='/components/customer' element={<Customer/>}/>
        <Route path='/components/retailer/viewretailer' element={<ViewRetailer/>}/>
        <Route path='/components/retailer/addretailer' element={<AddRetailer/>}/>

        <Route path='/components/user/viewuserprofile' element={ViewProfile}/>
    </Routes>
   
          </div>
        </Content>
    </div>
  )
}

export default Content
