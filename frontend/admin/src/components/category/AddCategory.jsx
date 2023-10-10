import React,{useState} from 'react'
import axios from 'axios';
import Sidebar from '../../Sidebar';
import Form from 'react-bootstrap/Form';

const AddCategory = () => {
    const [category_id, setCategoryId] = useState('')
    const [category_name, setCategoryName] = useState('')
    const [category_image, setCategoryImage] = useState('')
    const [gst, setGst] = useState('')
    const handleImage = (e) =>{
        setCategoryImage(e.target.files[0])
    }

    const submitData = async(e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('category_id', category_id);
        formData.append('category_name', category_name);
        formData.append('category_image', category_image);
        formData.append('gst', gst);
        const configs ={
            "content-Type": "multiple/form-data"
        }
        const apiData = await axios.post("http://localhost:7000/api/addcategory", formData, configs)
        console.log(apiData, 'apidata')
        setCategoryId('')
        setCategoryName('')
        setCategoryImage('')
        setGst('')
    }
  return (
   <>
   <Sidebar>
   <div className='container' style={{paddingTop:'0px', height:'550px'}}>
   <Form onSubmit={submitData} style={{ height:'540px', marginTop:'5px',paddingTop:'10px'}}>
   <h3 style={{ textAlign: 'center'}}>Add Category</h3>
    <div style={{marginTop:'20px'}}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='category_id' style={{fontSize:'16px'}}>Category Id</Form.Label>
        <Form.Control className='inpt' name='category_id' id='category_id' type='text' value={category_id} onChange={(e) =>setCategoryId(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='category_name' style={{fontSize:'16px'}} >Category Name</Form.Label>
        <Form.Control className='inpt'  name='category_name' id='category_name' type='text' value={category_name} onChange={(e) =>setCategoryName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='category_image' style={{fontSize:'16px'}}>Category Image</Form.Label>
        <Form.Control className='inpt' name='category_image' id='category_image' type='file' defaultValue={category_image} onChange={handleImage} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor='gst' style={{fontSize:'16px'}}>GST</Form.Label>
        <Form.Control className='inpt' name='gst' id='gst' type='float' value={gst} onChange={(e) =>setGst(e.target.value)} />
      </Form.Group>
</div>
      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
      <div className="row" style={{marginLeft:'0px', marginTop: "60px", paddingLeft: "0px", justifyContent: 'space-evenly', display:'flex'}}>
              
              <button className="button" style={{width:'80px', height:'40px', paddingTop:'4px'}} type="submit"><span>Save</span></button>
          <button className='button' style={{width:'80px', height:'40px', paddingTop:'4px', paddingLeft:'13px'}} variant="primary">
             <span>Reset</span>
          </button>

          </div>
    </Form>


   </div>


      </Sidebar>
   </>
  )
}

export default AddCategory
