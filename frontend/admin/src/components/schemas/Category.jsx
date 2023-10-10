import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
   category_id: Yup.string().min(2).max(25).required("Please enter User Id"),
   category_name: Yup.string().min(2).max(25).required("Please enter name"),
    gst: Yup.number().min(2).max(10)
   //    categ: Yup.string().min(6).required("Please enter your password")
    })