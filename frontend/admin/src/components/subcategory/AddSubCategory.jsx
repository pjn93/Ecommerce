import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from '../../Sidebar';

const AddSubCategory = () => {
  // const [category_id, setCategoryId] = useState('')
  const [subCategory_id, setSubCategoryId] = useState('')
  const [subCategory_name, setSubCategoryName] = useState('')
  const [subCategory_image, setSubCategoryImage] = useState('')
  let [res, setRes] = useState();
  let [catid, setCatid] = useState();
  const [productcategory, setProductcategory] = useState([]);
  const handleImage = (e) =>{
      setSubCategoryImage(e.target.files[0])
  }



  const submitData = async(e) =>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('category_id', catid);
    formData.append('subCategory_id', subCategory_id);
    formData.append('subCategory_name', subCategory_name);
    formData.append('subCategory_image', subCategory_image);
    const configs ={
        "content-Type": "multiple/form-data"
    }
    const apiData = await axios.post("http://localhost:7000/api/addsubcategory", formData, configs)
    console.log(apiData, 'apidata')
    setCatid('')
    setSubCategoryId('')
    setSubCategoryName('')
    setSubCategoryImage('')
    console.log(apiData.status);
if (apiData.status === 200) {
  setRes("Data inserted");
}
else {
  setRes("Try Again!!!!")
}
  }

  

  // const data = {
  //   subCategory_id: values.subCategory_id,
  //   category_id: catid,
  //    subCategory_name: values.subCategory_name,
  //    subCategory_image: values.subCategory_image

  // }



  const getCategoryId = async () => {
    const res = await axios.get("http://localhost:7000/api/subcategorylist")
    // console.log(res.data);
    setProductcategory(res.data)
  }
  useEffect(() => {
    getCategoryId()

  }, [])





  return (
    <>
<Sidebar>
<div className='container' style={{paddingTop:'0px', height:'550px'}}>
<h3 style={{ textAlign: 'center', marginTop: '10px' }}>Add SubCategory</h3>
<Form onSubmit={submitData} style={{ height:'480px', marginTop:'20px',paddingTop:'10px'}}>

      
       
          <div className="row">
            <div className='column'>
             <label style={{fontSize:'16px'}} htmlFor='subCategory_id'>SubCategory Id</label>
             <input style={{height:'40px'}} type="text" placeholder="pc1" id='subCategory_id' name='subCategory_id' onChange={(e) => setSubCategoryId(e.target.value)} value={subCategory_id}/>
            </div>
            </div>

            <div className='row'>
            <div className='column'>
              <label style={{fontSize:'16px'}} htmlFor='catid'>Category Id</label>
              <select id='catid' name='catid' onChange={(e) => setCatid(e.target.value)} value={catid} >
                <option>Main Category</option>
                {
                  productcategory.map((item, index) => {
                    return (
                      <option value={item.category_id}>{item.category_name}</option>
                    )
                  })
                }
              </select>
              {console.log(catid)}
            </div>
          </div>

          <div className='row'  style={{marginTop:'30px'}}>
            <div className='column'>
              <label style={{fontSize:'16px'}} htmlFor='subCategory_name'>subCategory Name</label>
              <input style={{height:'40px'}} type="text" id='subCategory_name' name='subCategory_name' placeholder="mobilr.." onChange={(e) => setSubCategoryName(e.target.value)} value={subCategory_name} />
            </div>
            </div>
            <div className='row'>
            <div className='column'>
              <label style={{fontSize:'16px'}} htmlFor='subCategory_image'>SubCategory Image</label>
              <input style={{height:'40px'}} id='subCategory_image' onChange={handleImage} defaultValue={subCategory_image}  type="file" name='subCategory_image' />
            </div>
          </div>
      <p>{res}</p>

      <div className='btn2' style={{marginTop:'60px',marginBottom:'50px'}} >
        <div >
          <button className='button' variant="primary" type="submit">
          <span>Save</span>
          </button>
        </div>
        <div >
          <button className='button' variant="primary" type="reset">
             <span>Reset</span>
          </button>
        </div>
      </div>
      
    </Form>
      </div>
      </Sidebar>
      </>  
  )
}

export default AddSubCategory
