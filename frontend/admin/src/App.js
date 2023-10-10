import React from 'react';
import {Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import './App.css';
import Dashboard from './components/Dashboard';
import AddOffer from './components/offer/AddOffer';
import ViewOffer from './components/offer/ViewOffer';
import ViewCategory from './components/category/ViewCategory';
import AddCategory from './components/category/AddCategory';
import ViewSubCategory from './components/subcategory/ViewSubCategory'
import AddSubCategory from './components/subcategory/AddSubCategory';
import ViewProfile from './components/user/ViewProfile';
import ViewUserProfile from './components/userprofile/ViewUserProfile'
import Customer from './components/Customer';
import ViewRetailer from './components/retailer/ViewRetailer';
import AddRetailer from './components/retailer/AddRetailer';
import ViewRole from './components/role/ViewRole';
import AddRole from './components/role/AddRole';
import ViewUser from './components/user/ViewUser';
import AddUser from './components/user/AddUser';
// import Sidebar from './Sidebar';


const App = () => {
  return (
   <>
   
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/components/dashboard' element={<Dashboard/>}/>
      <Route path='/components/offer/addoffer' element={<AddOffer/>}/>
      <Route path='/components/offer/viewoffer' element={<ViewOffer/>}/>
      <Route path='/components/category/viewcategory' element={<ViewCategory/>}/>
      <Route path='/components/category/addcategory' element={<AddCategory/>}/>
      <Route path='/components/subcategory/viewsubcategory' element={<ViewSubCategory/>}/>
      <Route path='/components/subcategory/addsubcategory' element={<AddSubCategory/>}/>
      <Route path='/components/profile/viewprofile' element={<ViewProfile/>}/>
      <Route path='/components/userprofile/viewuserprofile' element={<ViewUserProfile/>}/>
      <Route path='/components/user/viewuser' element={<ViewUser/>}/>
      <Route path='/components/user/adduser' element={<AddUser/>}/>
      <Route path='/components/role/viewrole' element={<ViewRole/>}/>
      <Route path='/components/role/addrole' element={<AddRole/>}/>
      <Route path='/components/customer' element={<Customer/>}/>
      <Route path='/components/retailer/viewretailer' element={<ViewRetailer/>}/>
      <Route path='/components/retailer/addretailer' element={<AddRetailer/>}/>
     


</Routes>
   </>
  )
}

export default App