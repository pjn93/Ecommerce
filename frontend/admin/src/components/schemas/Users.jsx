import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
   user_id: Yup.string().min(2).max(25).required("Please enter User Id"),
   name: Yup.string().min(2).max(25).required("Please enter name"),
   password: Yup.string().min(6).required("Please enter your password")
    })