import {Link} from 'react-router-dom';
 import {UserOutlined} from '@ant-design/icons';
import {AiFillAppstore} from 'react-icons/ai'
import {MdProductionQuantityLimits} from 'react-icons/md';
import {AiOutlineShop} from 'react-icons/ai';
import {TbDiscount2} from 'react-icons/tb';


function getItem(label, key, icon, children) {
    return {
     key,
     icon,
     children,
     label,
   };
 }
 const items = [
   getItem(<Link  style={{textDecoration:'none'}}  to="/components/dashboard">Dashboard</Link>, '1',<AiFillAppstore/>),
   getItem('Users', 'sub1', <UserOutlined />, [
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/user/adduser">Add User</Link>, '2'),
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/user/viewuser">View User</Link>, '3'),
   ]),
 
   getItem('Roles', 'sub2',<AiOutlineShop/>, [
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/role/addrole">Add Role</Link>, '4'),
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/role/viewrole">View Role</Link>, '5'),
   
   ]),
  
   getItem('Category', 'sub3',<MdProductionQuantityLimits />,[
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/category/addcategory">Add Category</Link>, '6'),
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/category/viewcategory">View Category</Link>, '7'),
   ]),
   getItem('SubCategory', 'sub4',<MdProductionQuantityLimits />,[
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/subcategory/addsubcategory">Add SubCategory</Link>, '8'),
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/subcategory/viewsubcategory">View SubCategory</Link>, '9')
   ]),
  
   
   getItem('Offers', 'sub5', <TbDiscount2/>,[
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/offer/addoffer">Add Offer</Link>, '10'),
     getItem(<Link  style={{textDecoration:'none'}}  to="/components/offer/viewoffer">View Offer</Link>, '11')]),
 
 // getItem(<TbDiscount2/>, <Link style={{textDecoration:'none'}} to="/components/customer">Customer</Link>),
  getItem(<Link style={{textDecoration:'none'}} to="/components/customer">Customer</Link>,'12', <TbDiscount2/>),
 getItem(<Link style={{textDecoration:'none'}} to="/components/retailer/viewretailer">Retailer</Link>,'13', <TbDiscount2/>),
 
 //  getItem(<Link style={{textDecoration:'none'}} to="/components/retailer/viewretailer"> <div style={{display:'flex'}}><TbDiscount2/><h6 style={{marginLeft:'10px'}}>Retailer</h6></div></Link>),
 
 ];

 export default items